const checkSession = (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.user: ", req.isAuthenticated());

  const expired = req.session.cookie.expires < Date.now();

  if (!req.isAuthenticated()) {
    return res.status(404).json({ expired: true });
  }

  return res.status(200).json({
    session: req.session,
    expired: false,
    user: { username: req.user.username, email: req.user.email },
  });
};

module.exports = checkSession;
