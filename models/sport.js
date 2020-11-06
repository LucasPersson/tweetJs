const mongoose = require('mongoose');
const Athlete = require('mongoose').model("athlete").schema;

const Schema = mongoose.Schema;;

const sportSchema = new Schema({
    name: String,
    athletes: [ Athlete ]
});

module.exports = mongoose.model('sport', sportSchema);
