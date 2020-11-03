const { NULL_EXPR } = require('@angular/compiler/src/output/output_ast')
const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    id: {type: Number, unique : true, required: true},
    name: {type: String, required: true} 
})

const Hero = mongoose.model('heroes', heroSchema )

module.exports = Hero