const { Account: AccountModel, User: UserModel, sequelize } = requireWrapper('models');
const { Op } = require('sequelize');
const { INCOME, EXPENSE } = requireWrapper('utils/constants/defaultData.js');

async function getActiveAccount (request, response, next) {
  const { user: { id, Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id;
  if (AccountId) {
    next();
  } else {
    const account = await UserModel.findOne({
      where: { id },
      attributes: ['id'],
      include: [{
        model: AccountModel,
        where: { isSelected: true },
        through: { attributes: [] }
      }]
    });

    if (account) {
      request.userData.user.Accounts = account.Accounts;
      next();
    } else {
      response.send(new ErrorBuilder(400, 'There are No Accounts', 'please create account'));
    }
  }
}
async function GetAccountDetails (request, response) {
  const { user: { id } } = request.userData;
  const account = await UserModel.findOne({
    where: { id },
    attributes: { exclude: ['id', 'googleId'] },
    include: [{
      model: AccountModel,
      through: { attributes: [] }
    }]
  });
  if (account === null) {
    response.send(new ErrorBuilder(400, 'There is No Accounts', 'something went wrong'));
  } else {
    response.send({ message: 'account Detailsy', data: account });
  }
}

const createAccount = async (request, response) => {
  const { user: { id } } = request.userData;

  const { name, savingPercentage, investmentPercentage } = request.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const currentUser = await UserModel.findOne({ where: { id } }, { transaction: t });

      const expenses = EXPENSE.map(category => ({ category }));

      const incomes = INCOME.map((category) => ({ category, amount: null }));

      const existingUserAccount = await currentUser.getAccounts({
        attributes: ['id'],
        where: { isSelected: true }
      }, { transaction: t });

      const ids = existingUserAccount.map((data) => data.id?.toString());

      await AccountModel.update({ isSelected: false }, {
        where: {
          [Op.or]: { id: ids }
        }
      }, { transaction: t });
      const userAccount = await AccountModel.create({
        name,
        savingPercentage,
        investmentPercentage,
        isSelected: true
      }, {
        transaction: t
      });

      for (const expense of expenses) {
        await userAccount.createExpense(expense, { transaction: t });
      }

      for (const income of incomes) {
        const incomeCategory = await userAccount.createIncomeCategory({ name: income.category, AccountId: userAccount.id }, { transaction: t });
        await userAccount.createIncome({
          amount: income.amount,
          incomeCategoryId: incomeCategory.id
        }, { transaction: t });
      }
      await currentUser.addAccount(userAccount, { transaction: t });
      // const accounts = await currentUser.getAccounts({ joinTableAttributes: [], where: { id: 11 } });
      return userAccount;
    });

    response.send({ message: 'account Details', data: { userAccount: result } });
  } catch (error) {
    response.send(new ErrorBuilder(422, 'some thing went wrong', error.message));
  }
};

module.exports = { GetAccountDetails, createAccount, getActiveAccount };
