const errorMiddleware = (err, req, res, next) => {
    console.error(err);
  
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Une erreur interne est survenue."
          : err.message,
    });
  };
  
  export default errorMiddleware;