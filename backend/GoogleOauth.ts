// require('dotenv').config()
const google_oauth_id = process.env.GOOGLE_OAUTH_ID
const google_oauth_secret = process.env.GOOGLE_OAUTH_SECRET
class GoogleOauth {
    static id: string = google_oauth_id;
    static secret: string = google_oauth_secret;
}
export default GoogleOauth;