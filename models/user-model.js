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
    return {
      username: this.username,
      userId: this.userId,
      age: this.age,
      gender: this.gender,
    }
  })

const User = mongoose.model('User', UserSchema)

module.exports = User