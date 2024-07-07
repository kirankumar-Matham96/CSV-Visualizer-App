export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.errorCode = code;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  const errorMessage = err.message || "something went wrong!";
  const statusCode = err.errorCode || 500;
  console.log(err);
  res.status(statusCode).json({ success: false, error: errorMessage });
};
