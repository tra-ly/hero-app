const { NULL_EXPR } = require('@angular/compiler/src/output/output_ast')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const heroSchema = new mongoose.Schema({
    id: {type: Number, unique : true, required: true},
    name: {type: String, required: true} 
})
heroSchema.plugin(mongoosePaginate);

const Hero = mongoose.model('heroes', heroSchema )

module.exports = Hero