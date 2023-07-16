const router = require('express').Router()
const { Product, Category, Tag, ProductTag } = require('../../models')

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ success: false, text: 'No products found', data: null })
        return
      } else {
        res
          .status(200)
          .json({ success: true, text: 'Listing all products', data: data })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const { id } = req.params
  Product.findOne({
    where: {
      id: id,
    },
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No product found with id ${id}`,
          data: null,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Listing product with id ${id}`,
          data: data,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      "product_name": "Basketball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */
  const { body } = req
  Product.create(body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (body.tagIds.length) {
        const productTagIdArr = body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          }
        })
        return ProductTag.bulkCreate(productTagIdArr)
      }
      // if no product tags, just respond
      res.status(200).json({
        success: true,
        text: `Showing product data for item: ${product.product_name}`,
        data: product,
      })
    })
    .then((productTagIds) =>
      res.status(200).json({
        success: true,
        text: 'Showing product tag ids',
        data: productTagIds,
      })
    )
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

// update product
router.put('/:id', (req, res) => {
  // update product data
  const body = req.body
  const { id } = req.params
  Product.update(body, {
    where: {
      id: Number(id),
    },
  })
    .then((product) => {
      if (body.tagIds && body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id)
          const newProductTags = body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: id,
                tag_id,
              }
            })

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !body.tagIds.includes(tag_id))
            .map(({ id }) => id)
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ])
        })
      }

      return res.status(200).json({
        success: true,
        text: `Updated item: ${body.product_name}`,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  const { id } = req.params
  Product.destroy({
    where: {
      id: Number(id),
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          success: false,
          text: `No product found with id ${id}`,
        })
        return
      } else {
        res.status(200).json({
          success: true,
          text: `Deleted product with id ${id}`,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    })
})

module.exports = router
