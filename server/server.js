/* eslint-disable no-console */
require('dotenv').config();
require('./utils/globalMethods');
const Express = require('express');
console.log(process.env, 'ENVS');
const { sequelize } = require('./models');

const userRouter = requireWrapper('modules/User/router.js');

const accountRouter = requireWrapper('modules/Account/router.js');

const incomeRouter = requireWrapper('modules/Income/router.js');

const expenseRouter = requireWrapper('modules/Expense/router.js');
const App = Express();

App.use(Express.json());

App.use('/auth', userRouter);

App.use('/account', accountRouter);

App.use('/income', incomeRouter);

App.use('/expense', expenseRouter);

App.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running in ${process.env.SERVER_PORT}`);
  sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function () {
    sequelize
      .sync({ alter: true }).success(function () {
        sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(function () {
          console.log('Database synchronised.');
        });
      }).catch(function (err) {
        console.log(err);
      }); ;
  }).catch(function (err) {
    console.log(err);
  });
});

// handling uncaughtException
process.on('uncaughtException', function (err) {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
});
