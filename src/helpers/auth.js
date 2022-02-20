const helpers = {}

helpers.isAuthenticated = (req,res,next) => {
    //req.isAuthenticated es un metodo que agrega passport para saber si hay un usuario o no
    if(req.isAuthenticated()) return next()
    res.redirect('/users/signin')
    req.flash('error_msg', 'Not authorized')
}

module.exports = helpers