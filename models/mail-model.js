const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MailSchema = new Schema({
  email: String,
  username: String,
  claim: String,
})


MailSchema 
  .virtual('info')
  .get(function() {
    return {
      username: this.username,
      email: this.email,
      claim: this.claim,
    }
  })

const Mail = mongoose.model('Mail', MailSchema)

module.exports = Mail
