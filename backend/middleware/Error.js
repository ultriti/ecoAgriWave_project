const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  this.statuscode = err.statusCode !== null ? err.statusCode : 404;
  this.message = err.message || 'Internal Server Error';
  console.log("sdfsdf:",this.statuscode);
  

  res.status(this.statuscode).json({
    success: false,
    error: err,
    message:err.message || 'Internal Server Error'
  });
};