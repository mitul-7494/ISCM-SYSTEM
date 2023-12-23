const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    balance: {
        type: Number,
        required:true,
        min: 0
    }
})

exports.customer = mongoose.model('customer', CustomerSchema);