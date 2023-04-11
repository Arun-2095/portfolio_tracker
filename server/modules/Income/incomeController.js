
const { Income, sequelize } = requireWrapper('models');

const { Op } = require('sequelize');
async function getIncomes (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;
  // console.log(JSON.stringify(Accounts), 'USERDATA');
  try {
    const income = await Income.findAll({
      attributes: ['id', 'amount', 'category'],
      where: { AccountId }

    });
    if (income === null) {
      response.send(new ErrorBuilder(400, 'There is No income Exist', 'something went wrong'));
    } else {
      response.send({ message: 'income details', income });
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', err));
  }
}

async function createIncomes (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const { amount, category } = request.body;

  const AccountId = Accounts[0]?.id || null;

  try {
    const isCategoryExists = await Income.findOne({ where: { AccountId, category } });

    if (isCategoryExists == null) {
      const income = await Income.create({
        amount, category, AccountId
      }, { exclude: ['AccountId'] });
      response.send({ message: 'income details added', income });
    } else {
      response.send(new ErrorBuilder(400, 'something went wrong', 'category Already exists'));
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', err || err?.message));
  }
}

async function updateIncome (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const { id, amount } = request.body;

  const AccountId = Accounts[0]?.id || null;

  try {
    const isCategoryExists = await Income.findOne({ where: { AccountId, id } });

    if (isCategoryExists != null) {
      const income = await Income.update({
        amount
      });
      response.send({ message: 'income details added', income });
    } else {
      response.send(new ErrorBuilder(400, 'something went wrong', 'category doesn\'t exists'));
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is issues Exist', err || err?.message));
  }
}

module.exports = { getIncomes, createIncomes, updateIncome };
