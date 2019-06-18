const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('./models/user');
var opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

passport.use(new jwtStrategy(opts, (payload, done) => {
    userModel.findById(payload.id, '-password',(err, user) => {
        if (err || !user) return done(err, null);
        return done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;