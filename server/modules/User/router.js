const express = require('express');
const userRouter = express.Router();
const { GoogleAuthenticationUrl, GoogleAuthentication } = requireWrapper(
  'Modules/User/userController'
);
const Authorization = requireWrapper('middleware/Authorization');

userRouter.get('/', GoogleAuthenticationUrl);

userRouter.get('/google', GoogleAuthentication, Authorization.generateToken);

userRouter.get('/about', (req, res) => {
  res.send('About birds');
});

module.exports = userRouter;
