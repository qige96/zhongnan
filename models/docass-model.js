const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DoctorAssessmentSchema = new Schema({
    doctorId: Number,
    doctorName: String,
    score: Number,
    assessment:String,
})


const DoctorAssessment = mongoose.model('DoctorAssessment', DoctorAssessmentSchema)

module.exports = DoctorAssessment
