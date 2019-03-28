const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeptDutySchema = new Schema({
    department: String,
    date: Date,
    timeSlot: Number,
    doctorname: String,
})


const DeptDuty = mongoose.model('DeptDuty', DeptDutySchema)

module.exports = DeptDuty
