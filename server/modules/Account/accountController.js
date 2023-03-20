const { Account: AccountModel, User: UserModel, sequelize } = requireWrapper('models');

const { INCOME, EXPENSE } = requireWrapper('utils/constants/defaultData.js');
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

      const userAccount = await AccountModel.create({
        name,
        savingPercentage,
        investmentPercentage
      }, {
        transaction: t
      });

      for (const expense of expenses) {
        await userAccount.createExpense(expense, { transaction: t });
      }

      for (const income of incomes) {
        await userAccount.createIncome(income, { transaction: t });
      }
      await currentUser.addAccount(userAccount, { transaction: t });

      return userAccount;
    });

    response.send({ message: 'account Details', data: { userAccount: result } });
  } catch (error) {
    response.send(new ErrorBuilder(422, 'some thing went wrong', error.message));
  }
};

module.exports = { GetAccountDetails, createAccount };
