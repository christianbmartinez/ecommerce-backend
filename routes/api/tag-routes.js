const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  res.status(200).json('GET all tags')
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
