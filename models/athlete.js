const mongoose = require('mongoose');

const Schema = mongoose.Schema;;

const athleteSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: { type: String, enum: ['MALE', 'FEMALE'] },
    country: { type: String, enum:['AU', 'CN', 'FR', 'EN', 'BR'] }
});

module.exports = mongoose.model('athlete', athleteSchema);
