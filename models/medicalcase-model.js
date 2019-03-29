const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MedicalCaseSchema = new Schema({
    userId: Number,
    bedId: Number,
    roomId: Number,
    date: Date,
    doctorId: Number,
    history: String,
    symptom: String,
    diagnosis: String,
    drug: String,
    note: String,
})


// MedicalCaseSchema 
//   .virtual('info')
//   .get(function() {
//     return {
//       username: this.username,
//       email: this.email,
//       claim: this.claim,
//     }
//   })

const MedicalCase = mongoose.model('MedicalCase', MedicalCaseSchema)

module.exports = MedicalCase
