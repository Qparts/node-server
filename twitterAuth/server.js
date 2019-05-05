const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;

const TWITTER_CONSUMER_KEY = "40bB0GOZYX968WZBwjPcrq9XS";
const TWITTER_CONSUMER_SECRET = "jDEmaiIHTPC8w2zD8fdTfkyjQ4GxXlMOAVDdzClut6WlmbZngE";

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:8000/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        return cb(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('root url')
})

app.get('/auth/twitter',
    passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // console.log(req.session.passport.user);

        res.redirect('/');
    });



app.listen(port, () => console.log(`server started at ${port}`));