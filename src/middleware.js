const checkLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.flash('error', 'You must be logged in to do that.');
    return res.redirect('/login');
};

export { checkLogin };