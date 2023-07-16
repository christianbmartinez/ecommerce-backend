const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id'],
    },
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ success: false, text: 'No tags found', data: null })
        return
      } else {
        res
          .status(200)
          .json({ success: true, text: 'Listing all tags', data: data })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  res.status(200).json(`GET all tags that match id of ${req.params.id}`)
})

router.post('/', (req, res) => {
  // create a new tag
})

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
})

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
})

module.exports = router
