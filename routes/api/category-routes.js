const router = require('express').Router()
const { Category, Product } = require('../../models')
const { update } = require('../../models/Category')

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
          .json({ success: false, text: 'No categories found', data: null })
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
  const { id } = req.params
  Category.findOne({
    where: {
      id: id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No category found for id ${id}`,
          data: null,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Listing category for id ${id}`,
          data: data,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

router.post('/', (req, res) => {
  // create a new category
  const { category_name } = req.body
  if (typeof category_name !== 'string' || category_name.length < 2) {
    res.status(400).json({
      success: false,
      text: `Please enter a valid category name. Expected a string of at least 2 characters, got ${category_name}`,
      data: null,
    })
  } else {
    Category.create({
      category_name: category_name,
    }).then((data) => {
      res
        .status(200)
        .json({
          success: true,
          text: `Created category for ${category_name}`,
          data: data,
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ success: false, error: err })
        })
    })
  }
})
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const { id } = req.params
  const { update_id } = req.body
  Category.update(update_id, {
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No category found for id ${id}`,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Updated category id from ${id} to ${update_id}`,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
})

module.exports = router
