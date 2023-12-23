const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
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

exports.admin = mongoose.model('admin', AdminSchema);