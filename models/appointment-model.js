const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
    username: String,
    userId: Number,
    date: Date,
    timeSlot: Number,
    department: String,
    note: String,
})


const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment
