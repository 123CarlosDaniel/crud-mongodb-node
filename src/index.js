require('dotenv').config()

const app = require('./server')
require('./database')

// console.log(process.env.SALUDO)
app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`)
})