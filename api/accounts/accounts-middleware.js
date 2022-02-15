const Accounts = require('./accounts-model')

function checkAccountPayload(req, res, next) {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  console.log('checkAccountPayload');
  const error = { status: 400 }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
  } else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = "budget of account must be a number"
  } else if (budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small"
  }
  if (error.message) {
    next(error)
  } else {
    next()
  }
}

async function checkAccountNameUnique(req, res, next) {
  // DO YOUR MAGIC
  console.log('checkAccountNameUnique middleware');
  const { name } = req.body
  try {
    const accountName = await Accounts.getByName(name.trim())
    if(accountName) {
      res.status(400).json({
        message:"that name is taken"
      })
    } else {
      next()
    }
  } catch(err){
    next(err)
  }
}

async function checkAccountId(req, res, next) {
  // DO YOUR MAGIC
  console.log('checkAccountId middleware');
  try {
    const account = await Accounts.getById(req.params.id)
    if (account) {
      req.account = account
      next()
    }
    else {
      res.status(404).json({ message: "account not found" })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { checkAccountPayload, checkAccountNameUnique, checkAccountId }