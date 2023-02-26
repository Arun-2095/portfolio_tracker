const { Portfolio: PortfolioModel, Account: AccountModel, User: UserModel } = requireWrapper('models');

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
    response.send(new ErrorBuilder(400, 'There is No Accounts', err.message));
  } else {
    console.log(account instanceof PortfolioModel); // true
    console.log(account); // 'My Title'
    response.send({ message: 'account Detailsy', data: account });
  }
}

const createAccount = async (request, response) => {
  const { user: { id } } = request.userData;

  const { name, savingPercentage, investmentPercentage } = request.body;

  try {
    const currentUser = await UserModel.findOne({ where: { id } });

    const userAccount = await AccountModel.create({
      name, savingPercentage, investmentPercentage
    });

    await userAccount.addUser(currentUser);

    response.send({ message: 'account Details', data: { userAccount } });
  } catch (err) {
    response.send(new ErrorBuilder(422, 'some thing went wrong', err));
  }
};

module.exports = { GetAccountDetails, createAccount };
