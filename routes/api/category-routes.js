const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ success: false, text: 'No categories found!', data: null })
        return
      } else {
        res
          .status(200)
          .json({ success: true, text: 'Listing all categories', data: data })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  res.status(200).json(`GET all categories that match id of ${req.params.id}`)
})

router.post('/', (req, res) => {
  // create a new category
})

router.put('/:id', (req, res) => {
  // update a category by its `id` value
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
})

module.exports = router
