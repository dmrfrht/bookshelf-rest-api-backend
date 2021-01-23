const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => {
      return new Date()
    }
  }
})

module.exports = mongoose.model("category", categorySchema)
