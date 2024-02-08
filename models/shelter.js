const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Capacity: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('Shelter', shelterSchema, 'shelters'); /* 'shelters' is defining the collection name */ 