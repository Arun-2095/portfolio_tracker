const { google } = require('googleapis');

class GoogleOAuth {
  scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  get consentScreenUrl () {
    return this.oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as a string
      scope: this.scopes
    });
  }

  setAccessToken (tokens) {
    this.oauth2Client.setCredentials({ access_token: tokens.access_token });
  }

  get oAuth2 () {
    return google.oauth2({
      auth: this.oauth2Client,
      version: 'v2'
    });
  }

  async userInfo (code) {
    const { tokens } = await this.oauth2Client.getToken(code);

    this.setAccessToken(tokens);

    return new Promise((resolve, reject) => {
      this.oAuth2.userinfo.get(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.data);
        }
      });
    });
  }
}

module.exports = GoogleOAuth;
