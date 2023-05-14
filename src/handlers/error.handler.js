const ErrorHandler = (err, req, res, next) => {
  const { status, message, error } = err;

  const errObj = {
    status: status || 500,
    message,
    error: err,
  };

  return res.status(errObj.status).json({
    ...errObj,
    error: true,
    message: errObj?.message ?? "Error: Some Error",
    data: err,
  });
};

export default ErrorHandler;
