const Category = require('../Models/Category.Model')
const Response = require('../response')
const { validationResult } = require('express-validator')

exports.list = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) new Response(null, err).error500(res)

    return new Response(categories, null).success(res)
  })
}

exports.getById = (req, res) => {
  Category.findById(req.params.category_id, (err, category) => {
    if (err) new Response().error500(res)

    if (category) new Response(category, null).success(res)
    else new Response().notFound(res)
  })
}

exports.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) new Response(null, errors.array()).error400(res)

  const category = new Category({ name: req.body.name })
  category.save((err) => {
    if (err) new Response(null, err).error500(res)

    return new Response(category, null).created(res)
  })
}

exports.update = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) new Response(null, errors.array()).error400(res)

  Category.findById(req.params.category_id, (err, category) => {
    if (err) new Response(null, err).error500(res)
    if (!category) new Response().notFound(res)

    category.name = req.body.name
    category.save((err) => {
      if (err) new Response(null, err).error500(res)

      return new Response(category, null).success(res)
    })
  })
}

exports.delete = (req, res) => {
  Category.findOneAndDelete({ _id: req.params.category_id }, (err, category) => {
    if (err) new Response(null, err).error500(res)
    if (!category) new Response().notFound(res)

    return new Response(category, null).success(res)
  })
}
