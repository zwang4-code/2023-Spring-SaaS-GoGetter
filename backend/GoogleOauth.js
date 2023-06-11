"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_oauth_id = process.env.GOOGLE_OAUTH_ID;
const google_oauth_secret = process.env.GOOGLE_OAUTH_SECRET;
class GoogleOauth {
}
GoogleOauth.id = google_oauth_id;
GoogleOauth.secret = google_oauth_secret;
exports.default = GoogleOauth;
