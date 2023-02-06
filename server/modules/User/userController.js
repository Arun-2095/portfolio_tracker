const GoogleOAuth = requireWrapper('services/GoogleService');
const {User:UserModel} = requireWrapper('models')
const Authorization = requireWrapper('middleware/Authorization')

let googleAuth = new GoogleOAuth()

const GoogleAuthenticationUrl = function (request, response) {

     response.redirect(googleAuth.consentScreenUrl);

};

const GoogleAuthentication = async function (request, response,next) {
  
  const { code } = request.query;

  try {

    let userInfo = await googleAuth.userInfo(code);

   
    const [user, created] = await UserModel.findOrCreate({
      where: { email: userInfo.email },
      defaults: {
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.id,
        picture: userInfo.picture,
      },
    });

     if (user) {
       request.userData = user
       next()
     } else {
       response.status(400).send({message:"something went wrong",error: err});
     }
  
  }catch(err){
     console.log(err, "ERROR")
     response.status(422).send({ message: "something went wrong", error: err.message });
  }

};



module.exports = { GoogleAuthenticationUrl, GoogleAuthentication };
