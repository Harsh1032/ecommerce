const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
    image:{
        type: String,
    },
    name:{
        type: String,
    },
    price:{
        type: Number,
    }
}, {timestamps: true});

module.exports = mongoose.model('Snack', snackSchema);