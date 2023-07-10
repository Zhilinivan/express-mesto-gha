const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина 2 символа.'],
    maxlength: [30, 'Максимальная длина 30 символов.'],
  },

  about: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина 2 символа.'],
    maxlength: [30, 'Максимальная длина 30 символов.'],
  },

  avatar: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('user', userSchema);