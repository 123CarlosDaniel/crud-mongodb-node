const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //Match email's user 
    const user = await User.findOne({
        email:email
    })
    if (!user) {
        return done(null, false, {
            message: 'User do not exist'
        })
    } else {
        //Match password's user
        const match =await user.matchPassword(password)
        if (match) {
            return done(null, user)  //valida successRedirect 
        } else {
            return done(null, false, {
                message: 'Password incorrect'
            })
        }
    }
}))

passport.serializeUser(( user, done) => {
    done(null,user.id)
})

passport.deserializeUser( (id, done) => {
    User.findById(id, (err,user) => {
        done(err,user)
    })
})