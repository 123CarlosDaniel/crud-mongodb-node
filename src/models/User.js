
const bcrypt = require('bcryptjs')
const {Schema , model } = require('mongoose')

const userSchema = new Schema( {
    name : { type :String, required : true},
    email : { type :String, required : true, unique:true},
    password : { type :String, required : true}
}, {
    timestamps : true,
    versionKey : false
})

userSchema.methods.encryptPassword =async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
} 

userSchema.methods.matchPassword = async function (password) {
    const value = await bcrypt.compare(password,this.password )
    return value
}

module.exports = model('User', userSchema)