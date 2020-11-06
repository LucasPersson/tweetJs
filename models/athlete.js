const mongoose = require('mongoose');
const genderEnum = require("./gender");
const countryEnum = require("./country");

const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: { type: String, enum: genderEnum },
    country: { type: String, enum: countryEnum }
});

module.exports = mongoose.model('athlete', athleteSchema);
