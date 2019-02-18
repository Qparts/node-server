

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const isProduction = process.env.NODE_ENV === 'production';
require('dotenv').config();
const session = require('express-session');
const routes = require('./routes/index');
const crypto = require('crypto');

// Create global app object
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: crypto.randomBytes(12).toString('hex'),
    cookie: { secure: false },
    resave: false,
    saveUninitialized: true,
})
)

// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
    app.use(errorhandler());
}

app.use(express.static('/srv/q-parts/build'))
app.use(routes);

app.get('/*', (req, res) => {
    res.sendFile('/srv/q-parts/build/index.html', err => {
        if (err) {
            res.status(500).send(err)
        }
    })
});

/// error handlers

// development error handler
// will print stacktrace
// if (!isProduction) {
//  app.use(function (err, req, res, next) {
//   console.log(err.stack);

//   res.status(err.status || 500);

//   res.json({
//    'errors': {
//     message: err.message,
//     error: err
//    }
//   });
//  });
// }

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
var server = app.listen(process.env.PORT || 8000, function () {
    console.log('Listening on port ' + server.address().port);
});
