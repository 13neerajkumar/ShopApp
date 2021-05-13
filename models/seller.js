const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');


const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

sellerSchema.plugin(passportLocalMongoose);

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;