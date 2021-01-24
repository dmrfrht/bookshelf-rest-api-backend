const router = require('express').Router()
const CategoryController = require('./Controllers/CategoryController')
const BookController = require('./Controllers/BookController')
const { check } = require('express-validator')

const categoryValidator = new Array(
  check("name").notEmpty().withMessage("İsim alanı boş olamaz")
)

const bookValidator = new Array(
  check("title").notEmpty().withMessage("Başlık alanı boş olamaz"),
  check("author").notEmpty().withMessage("Yazar alanı boş olamaz"),
  check("price").notEmpty().withMessage("Fiyat alanı boş olamaz").isFloat().withMessage("Fiyat değeri float olmalıdır"),
  check("stock").notEmpty().withMessage("Stok alanı boş olamaz").isInt().withMessage("Stok alanı tam sayı değer olmalıdır"),
  check("picture").notEmpty().withMessage("Kapak resim alanı boş olamaz"),
  check("categoryBy").notEmpty().withMessage("Kategori alanı boş olamaz")
)

// localhost:9090/api/category
router.route('/category')
  .get(CategoryController.list)
  .post([categoryValidator], CategoryController.create)

// localhost:9090/api/category/:category_id
router.route('/category/:category_id')
  .get(CategoryController.getById)
  .put([categoryValidator], CategoryController.update)
  .delete(CategoryController.delete)

// locahost:9090/api/book
router.route('/book')
  .get(BookController.list)
  .post([bookValidator], BookController.create)

// localhost:9090/api/book/:book_id
router.route('/book/:book_id')
  .get(BookController.getById)
  .put([bookValidator], BookController.update)
  .delete(BookController.delete)

// locahost:9090/api/books/:category_id
router.route('/books/:category_id')
  .get(BookController.listByCategoryId)

// localhost:9090/book/saveImage
router.route('/book/saveImage').post(BookController.upload.single("picture"), BookController.saveImage)

module.exports = router
