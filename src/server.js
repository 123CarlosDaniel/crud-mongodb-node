
const express = require('express')
const path  = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')
//Initializations 
app = express()

//setings 
app.set('port', process.env.PORT || 3000 )
app.set('views', path.join(__dirname,'views'))
app.engine(
    '.hbs', 
    exphbs({
    defaultLayout: 'main',  //archivo por default que leera
    layoutsDir : path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'),'partials'),
    extname : '.hbs',
})
)
app.set('view engine','.hbs')

//middlewares

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
    //modulo que ayuda a guardar los mensajes en el servidor 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//Global variables

app.use( (req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')  //passport agrega este nombre
    res.locals.user = req.user || null 
    next()
})
//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

//Static files 
app.use(express.static(path.join(__dirname,'public')))

module.exports = app