

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const isProduction = process.env.NODE_ENV === 'production';
require('dotenv').config();
const session = require('express-session');
const crypto = require('crypto');
const nocache = require('nocache');
const buildPath = 'public/build';
const Client = require('./websocket/client');

// Create global app object
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const routes = require('./routes/index');
const eightHours = 28800000;
const sessionMiddleware = session({
    secret: crypto.randomBytes(12).toString('hex'),
    cookie: {
        maxAge: eightHours
    },
    resave: false,
    saveUninitialized: true,
});

// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '500kb' }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(sessionMiddleware);

io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

let client = new Client(io);

if (!isProduction) {
    app.use(errorhandler());
}

app.use(express.static(`${__dirname}/${buildPath}`))
app.use(routes);
app.use(nocache());


app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/${buildPath}/index.html`, err => {
        if (err) {
            res.status(500).send(err)
        }
    })
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

// finally, let's start our server...
server.listen(process.env.PORT || 8000, function () {
    console.log('Listening on port ' + server.address().port);
});
