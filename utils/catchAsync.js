module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // next ile globalErrorHandling middleware ile bağlantı kurduk.
  };
};
