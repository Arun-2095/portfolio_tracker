var jwt = require("jsonwebtoken");


class AuthorizationClass {
  generateToken(request, response, next) {
    let data = request.userData;
    console.log(data, "USER")
    try {
    let token = jwt.sign({ user: data }, process.env.SECRET_PRIVATE_KEY, {
      expiresIn: 60 * 60,
    });
     response.status(200).send({ message: "Register Success", token });
    } catch(err){
     response.send(new ErrorBuilder(422, "failed in token validation", err.message));
    }
  }

  verifyToken(request, response, next) {
    let tokenHeader = request.headers["authorization"] ?? "";

    let token = tokenHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_PRIVATE_KEY, function (err, userData) {
      if (err) {
        response.send(new ErrorBuilder(422, "failed in token validation", err.message));
      } else {
        request.userData = userData;
        next();
      }
    });
  }
}

let Authorization = new AuthorizationClass()

module.exports =  Authorization