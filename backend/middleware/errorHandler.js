const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  let status = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }
  if (err.code === 11000) {
    status = 409;
    message = "Email already registered";
  }
 
  res.status(status).json({ message });
};

module.exports = { notFound, errorHandler };