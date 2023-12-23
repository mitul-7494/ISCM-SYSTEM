const mongoose = require('mongoose');
const { Schema } = mongoose;

const SalesSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    }
})

exports.sales = mongoose.model('sales', SalesSchema);