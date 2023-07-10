class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  DefaultError
};
