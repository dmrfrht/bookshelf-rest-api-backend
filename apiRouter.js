const router = require('express').Router()
const CategoryController = require('./Controllers/CategoryController')

// localhost:9090/api/category
router.route('/category').get(CategoryController.list).post(CategoryController.create)

// localhost:9090/api/category/category_id
router.route('/category/:category_id').put(CategoryController.update).delete(CategoryController.delete)

module.exports = router