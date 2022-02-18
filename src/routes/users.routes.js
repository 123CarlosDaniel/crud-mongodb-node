
const {Router} = require('express')
const router = Router()

const { renderSignUpForm, renderSingInForm, logout, singup, signin} = require('../controllers/users.controller')

router.get('/users/signup', renderSignUpForm)
router.post('/users/signup', singup)
router.get('/users/signin', renderSingInForm)
router.post('/users/signin', signin)
router.get('/users/logout', logout)

module.exports = router