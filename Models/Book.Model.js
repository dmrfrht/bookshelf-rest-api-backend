const mongoose = require('mongoose')
const category = require('./Category.Model')

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    //required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  categoryBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  }
})

module.exports = mongoose.model("book", bookSchema)
