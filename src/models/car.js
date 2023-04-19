const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Add your models here.
const CarSchema = new Schema({
    make: {type: String, required: true},
    model: {type: String, required: true},
    model_years: {type: String, required: true},
    number_of_doors: {type: Number, required: true},
    modern_hp: {type: Number, required: true}
})

const Car = mongoose.model('Car', CarSchema)

module.exports = Car