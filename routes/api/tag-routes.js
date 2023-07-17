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
  const { id } = req.params
  Tag.findOne({
    where: {
      id: Number(id),
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id'],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No tag found with id ${id}`,
          data: null,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Listing tag with id ${id}`,
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
  // create a new tag
  const { tag_name } = req.body
  if (typeof tag_name !== 'string' || tag_name.length < 2) {
    res.status(400).json({
      success: false,
      text: `Please enter a valid tag name. Expected a string of at least 2 characters, got ${tag_name}`,
      data: null,
    })
  } else {
    Tag.create({
      tag_name: tag_name,
    })
      .then((data) => {
        res.status(200).json({
          success: true,
          text: `Created tag with name ${tag_name}`,
          data: data,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ success: false, error: err })
      })
  }
})

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body
  const { id } = req.params
  Tag.update(tag_name, {
    where: {
      id: Number(id),
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No tag found with id ${id}`,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Updated tag name to ${tag_name} with id ${id}`,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params
  Tag.destroy({
    where: {
      id: Number(id),
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No tag found with id ${id}`,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Deleted tag with id ${id}`,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

module.exports = router
