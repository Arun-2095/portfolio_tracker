const GoogleOAuth = requireWrapper('services/GoogleService');
const { User: UserModel, Account: AccountModel } = requireWrapper('models');
const Authorization = requireWrapper('middleware/Authorization');

const googleAuth = new GoogleOAuth();

const GoogleAuthenticationUrl = function (request, response) {
  response.redirect(googleAuth.consentScreenUrl);
};

const GoogleAuthentication = async function (request, response, next) {
  const { code } = request.query;

  try {
    const userInfo = await googleAuth.userInfo(code);

    const [user, created] = await UserModel.findOrCreate({
      where: { email: userInfo.email },
      include: [{
        model: AccountModel,
        where: { isSelected: true }
      }],
      defaults: {
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.id,
        picture: userInfo.picture
      }
    });

    if (user) {
      request.userData = user;
      next();
    } else {
      response.status(400).send({ message: 'something went wrong', error: err });
    }
  } catch (err) {
    console.log(err, 'ERROR');
    response.status(422).send({ message: 'something went wrong', error: err.message });
  }
};

module.exports = { GoogleAuthenticationUrl, GoogleAuthentication };
