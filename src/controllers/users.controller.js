const usersCtrl = {}
const User = require('../models/User')
const passport = require('passport')
//MOSTRAR SIGN Up form 
usersCtrl.renderSignUpForm = (req,res) => {
    res.render('users/SignUp')
}

usersCtrl.singup = async (req,res) => {
    const errors = []
    const {name, email , password, confirm_password} = req.body
    if( password != confirm_password) {
        errors.push({text :'Passwords do not match' })
    }
    if(password.length<4){
        errors.push({text : 'Password must have at least 4 characters'})
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    }
    else{
        const emailUser = await User.findOne({email:email})
        if(emailUser){
            console.log(emailUser)
            req.flash('error_msg','The email is already in use')
            res.redirect('/users/signup')
        }else{
            const newUser = new User({name,email,password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg','You are now registered')
            res.redirect('/users/signin')
        }
    }
}

//MOSTRAR EL SING IN FORM
usersCtrl.renderSingInForm = (req,res) => {
    res.render('users/SignIn')
}
    //Verifica si esta loggeado o no
usersCtrl.signin = passport.authenticate('local',{
    failureRedirect :'/users/signin',
    successRedirect : '/notes',
    failureFlash : true
})

//LOGOUT
usersCtrl.logout = (req,res) => {
    req.logout()
    req.flash('success_msg','You are now logged out' )
    res.redirect('/users/signin')
}

module.exports = usersCtrl