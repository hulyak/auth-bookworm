// The loggedOut( ) middleware function
function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const err = new Error('User must be logged in to view the page');
    err.status = 403;
    return next(err);
  }
}

module.exports = {loggedOut, requiresLogin};
