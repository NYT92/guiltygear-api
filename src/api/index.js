const express = require('express');

const character = require('./character');
const quotes = require('./quotes');
const data = require('./datamgr');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'OK',
  });
});

router.use('/character', character);
router.use('/quotes', quotes);
router.use('/data', data);

module.exports = router;
