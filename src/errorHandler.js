const { NODE_ENV } = require('./config');
const logger = require('./logger');

function errorHandler(err, req, res, next) {
  logger.error(err.message);
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(err);
    response = { message: err.message, error: err };
  }
  return res.status(err.status ? err.status : 500).json(response);
}

module.exports = errorHandler;
