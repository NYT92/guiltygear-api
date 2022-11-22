const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const limiter = rateLimit({
  windowMs: 60000,
  max: process.env.RATE_LIMIT,
  standardHeaders: false,
  legacyHeaders: true,
  message: async (req, res) => {
    res.status(429).json({
      status: 429,
      message: 'Too many requests, please wait before sending another request.',
    });
  },
});

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'guilty gear api',
    info: 'READ AT - https://github.com/NYT92/guiltygear-api#endpoints',
    license: {
      MIT: 'https://github.com/NYT92/guiltygear-api/blob/main/LICENSE',
      CCv3:
        'This article uses material from every characters article on the Guilty Gears wiki at Fandom and is licensed under the Creative Commons Attribution-Share Alike License.',
    },
  });
});

app.use('/api', limiter);
app.use('/api/', api);
app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
  next();
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
