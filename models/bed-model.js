const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BedSchema = new Schema({
    roomId: Number,
    bedId: Number,
    username: String,
    userId: Number,
})


const Bed = mongoose.model('Bed', BedSchema)

module.exports = Bed
