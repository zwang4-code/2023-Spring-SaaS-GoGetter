import googleAppAuth from './GoogleOauth';

let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;

class GooglePassport {

    clientId: string;
    secretId: string;
     
    constructor() { 
        this.clientId = googleAppAuth.id;
        this.secretId = googleAppAuth.secret;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback"
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("Google Information");
                process.nextTick( () => {
                    console.log("oAuth Id: " + profile.id);
                    console.log("Display Name: " + profile.displayName);
                    console.log("Profile Pic: " + profile.photos[0].value);
                    console.log("----------------------------------------------------------------------------------------");
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}
export default GooglePassport;