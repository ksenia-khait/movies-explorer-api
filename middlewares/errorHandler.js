const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === 'ObjectId') {
    res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'Что-то пошло не так'
        : message,
    });
  }
  if (next) {
    next();
  }
};

module.exports = errorHandler;
