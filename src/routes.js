const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.flash('error', 'You must be logged in to access that page.');
    return res.redirect('/login');
};

const requireRole = (role) => (req, res, next) => {
    if (!req.session?.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    if (req.session.user.role_name !== role) {
        req.flash('error', 'You do not have permission to access that page.');
        return res.redirect('/dashboard');
    }
    return next();
};

export { requireLogin, requireRole };