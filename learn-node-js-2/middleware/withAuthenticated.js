export default (req, res, next) => {
  // TODO: is user authenticated? what's their role
  req.isAdmin = true;
  req.isAuthenticated = true;
  next();
}