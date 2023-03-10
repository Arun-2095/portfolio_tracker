require('dotenv').config();
require('./utils/globalMethods');
const Express = require('express');
const { sequelize } = require('./models');

const userRouter = requireWrapper('modules/User/router.js');

const accountRouter = requireWrapper('modules/Account/router.js');

const App = Express();

App.use(Express.json());

App.use('/auth', userRouter);

App.use('/account', accountRouter);

App.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running in ${process.env.SERVER_PORT}`);
  sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
    sequelize
      .sync().success(function () {
        sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(function () {
          console.log('Database synchronised.');
        });
      }).catch(function (err) {
        console.log(err);
      }); ;
  }).catch(function (ee) {
    console.log(err);
  });
});

// handling uncaughtException
process.on('uncaughtException', function (err) {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
});
