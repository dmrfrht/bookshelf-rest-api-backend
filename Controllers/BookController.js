const Book = require('../Models/Book.Model')
const Response = require('../response')
const { validationResult } = require('express-validator')
const multer = require('multer')
const path = require('path')

let bookFileName = null

exports.list = (req, res) => {
  Book.find({}).sort({ createdAt: -1 }).populate("categoryBy").exec((err, books) => {
    if (err) new Response(null, err).error500(res)

    return new Response(books, null).success(res)
  })
}

exports.getById = (req, res) => {
  Book.findById(req.params.book_id).populate("categoryBy").exec((err, book) => {
    if (err) new Response(null, err).error500(res)

    if (book) new Response(book, null).success(res)
    else new Response().notFound(res)
  })
}

exports.listByCategoryId = (req, res) => {
  const _id = req.params.category_id

  Book.find({ categoryBy: _id }).populate("categoryBy").exec((err, books) => {
    if (err) new Response(null, err).error500(res)

    return new Response(books, null).success(res)
  })
}

exports.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) new Response(null, errors.array()).error400(res)

  const { title, author, price, stock, picture, categoryBy } = req.body
  const book = new Book({
    title,
    author,
    price,
    stock,
    picture,
    categoryBy: categoryBy._id
  })

  book.save((err) => {
    if (err) new Response(null, err).error500(res)

    return new Response(book, null).created(res)
  })

}

exports.update = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) new Response(null, errors.array()).error400(res)

  Book.findById(req.params.book_id, (err, book) => {
    if (err) new Response(null, err).error500(res)
    if (!book) new Response().notFound(res)

    const { title, author, price, stock, picture, categoryBy } = req.body
    book.title = title
    book.author = author
    book.price = price
    book.stock = stock
    book.picture = picture
    book.categoryBy = categoryBy._id

    book.save(err => {
      if (err) new Response(null, err).error500(res)

      return new Response(book, null).success(res)
    })
  })
}

exports.delete = (req, res) => {
  Book.findOneAndDelete({ _id: req.params.book_id }, (err, book) => {
    if (err) new Response(null, err).error500(res)
    if (!book) new Response().notFound(res)

    return new Response(book, null).success(res)
  })
}

/** Upload Image */
let myStoreage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const error = file.mimetype === "image/jpeg" ? null : new Error("yanlış uzantı")

    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    bookFileName = Date.now() + path.extname(file.originalname)

    cb(null, bookFileName)
  }
})

exports.upload = multer({
  storage: myStoreage
})

exports.saveImage = (req, res) => {
  try {
    res.status(200).json({ "status": true, "url": `http://localhost:${process.env.PORT}/${bookFileName}` })
  } catch (err) {
    res.status(500).send(err)
  }
}

