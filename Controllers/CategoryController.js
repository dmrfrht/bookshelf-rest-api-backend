const Category = require('../Models/Category.Model')
const response = require('../response')

exports.list = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) new response(null, err).error500(res)

    return new response(categories, null).success(res)
  })
}
