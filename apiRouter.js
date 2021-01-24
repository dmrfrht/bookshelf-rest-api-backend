const router = require('express').Router()
const CategoryController = require('./Controllers/CategoryController')
const BookController = require('./Controllers/BookController')
const { check } = require('express-validator')

// localhost:9090/api/category
router.route('/category')
  .get(CategoryController.list)
  .post([check("name").notEmpty().withMessage("İsim alanı boş olamaz")], CategoryController.create)

// localhost:9090/api/category/:category_id
router.route('/category/:category_id')
  .get(CategoryController.getById)
  .put([check("name").notEmpty().withMessage("İsim alanı boş olamaz")], CategoryController.update).delete(CategoryController.delete)

// locahost:9090/api/book
router.route('/book')
  .get(BookController.list)
  .post(BookController.create)

// localhost:9090/api/book/:book_id
router.route('/book/:book_id')
  .get(BookController.getById)
  .put(BookController.update).delete(BookController.delete)

// locahost:9000/api/books/:category_id
router.route('/books/:category_id')
  .get(BookController.listByCategoryId)

module.exports = router
