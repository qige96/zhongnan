const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DoctorSchema = new Schema({
    doctorId: Number,
    doctorname: String,
    password: String,
    age: Integer,
    department: String,
    years: Number,
})


const Doctor = mongoose.model('Doctor', DoctorSchema)

module.exports = Doctor
