const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    id: {
      type: Number,
      unique: true,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    }
})

exports.items = mongoose.model('items', ItemSchema);