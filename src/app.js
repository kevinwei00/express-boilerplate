/*******************************************************************
  IMPORTS
*******************************************************************/
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const validateBearerToken = require('./validateBearerToken');

/*******************************************************************
  INIT
*******************************************************************/
const app = express();

/*******************************************************************
  MIDDLEWARE
*******************************************************************/
app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);

/*******************************************************************
  ROUTES
*******************************************************************/
app.get('/', (req, res) => {
  return res.send('Hello, world!');
});

/*******************************************************************
  ERROR HANDLING
*******************************************************************/
app.use(function errorHandler(err, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(err);
    response = { message: err.message, error: err };
  }
  return res.status(500).json(response);
});

/*******************************************************************
  EXPORTS
*******************************************************************/
module.exports = app;
