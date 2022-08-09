const { SERVER_ERROR_MESSAGE } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const { message } = err;
  res.status(status).json({ err: message || SERVER_ERROR_MESSAGE });
  return next();
};

module.exports = errorHandler;
