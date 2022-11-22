const express = require('express');
const { Deta } = require("deta");

const deta = Deta(process.env.DETA_KEY);
const gg_data = deta.Base("gg_charcts_data");

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'SOON',
  });
})

router.get('/fetch', (req, res) => {
  const verifykey = req.headers['api-dev-key']

  if (!verifykey) {
    res.status(200).json({
      status: 200,
      message: 'OK',
      info: 'REQUIRED API_DEV_KEY/DETA_KEY TO ACCESS THE DATA'
    })
  } else if (verifykey === process.env.API_DEV_KEY) {
    res.status(200).json({
      status: 200,
      message: 'OK',
      info: 'API_DEV_KEY VERIFIED SUCCESSFULLY'
    })
  }
});

module.exports = router;

