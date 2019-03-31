const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: Number,
  username: String,
  password: String,
  age: Number,
  gender: Boolean,
})


UserSchema
  .virtual('userInfo')
  .get(function() {
    let gender;
    if(this.gender)
      gender = "男"
    else
      gender = "女"
    return {
      username: this.username,
      userId: this.userId,
      age: this.age,
      gender: gender,
    }
  })

const User = mongoose.model('User', UserSchema)

module.exports = User