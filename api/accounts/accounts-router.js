const express = require('express');
const router = express.Router();
const Accounts = require('./accounts-model');
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accountsArray = await Accounts.getAll()
    res.json(accountsArray)
    // throw new Error("YIPES")//first test
    //res.json([{}, {}])//secton test
  } catch (err) {
    next(err)
  }
  // DO YOUR MAGIC
});

router.get('/:id',  checkAccountId, (req, res) => {
  res.json(req.account)
  // DO YOUR MAGIC
});

router.post('/', checkAccountPayload,
checkAccountNameUnique,
async (req, res, next) => {
  try { 
    const newAccount = await Accounts.create({ 
      name:req.body.name.trim(),
      budget: req.body.budget
    });
    res.status(201).json(newAccount) 
} catch (err) {
    next(err)
  }
  // DO YOUR MAGIC
});

router.put('/:id', checkAccountId,
checkAccountPayload,
async (req, res, next) => {
  try {
    const editedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(editedAccount) 
  } catch (err) {
    next(err)
  }
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
     res.json(req.account)
   } catch (err) {
     next(err)
   }
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
  // DO YOUR MAGIC
})

module.exports = router;
