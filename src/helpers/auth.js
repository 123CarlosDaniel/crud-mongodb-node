const helpers = {}

helpers.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/signin')
    req.flash('error_msg', 'Not authorized')
}

module.exports = helpers