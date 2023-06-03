"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleOauth_1 = require("./GoogleOauth");
let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
class GooglePassport {
    constructor() {
        this.clientId = GoogleOauth_1.default.id;
        this.secretId = GoogleOauth_1.default.secret;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback"
        }, (accessToken, refreshToken, profile, done) => {
            console.log("Google Information");
            process.nextTick(() => {
                console.log("oAuth Id: " + profile.id);
                console.log("Display Name: " + profile.displayName);
                console.log("Profile Pic: " + profile.photos[0].value);
                console.log("----------------------------------------------------------------------------------------");
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
}
exports.default = GooglePassport;
