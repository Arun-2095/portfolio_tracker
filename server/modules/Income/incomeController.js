
const { Account: AccountModel, User: UserModel, Income } = requireWrapper('models');
async function getIncomes (request, response) {
  const { user: { id } } = request.userData;
  const income = await Income.findAll({
    attributes: ['amount', 'category'],
    include: [{
      model: AccountModel,
      include: [{
        model: UserModel,
        through: { attributes: [] },
        where: { id }
      }]
    }
    ]
  });
  if (income === null) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', 'something went wrong'));
  } else {
    response.send({ message: 'account Detailsy', income });
  }
}

async function createIncomes (request, response) {
  const { user: { id } } = request.userData;
  const income = await Income.findAll({
    attributes: ['amount', 'category'],
    include: [{
      model: AccountModel,
      attributes: [],
      include: [{
        model: UserModel,
        through: { attributes: [] },
        where: { id }
      }]
    }
    ]
  });
  if (income === null) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', 'something went wrong'));
  } else {
    response.send({ message: 'account Detailsy', income });
  }
}

module.exports = { getIncomes, createIncomes };
