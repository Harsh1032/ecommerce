const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Drink', drinkSchema);