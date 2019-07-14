export default (req, res, next) => {
  console.log(
    '=> ',
    req.method,
    req.originalUrl,
    'isAuthenticated: ',
    req.isAuthenticated,
    'isAdmin: ',
    req.isAdmin
  );
  next();
};