const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories, be sure to include its associated Products

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find one category by its `id` value, be sure to include its associated Products
router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id,
      attribute: ['id','category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({message: 'Category not found with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new category
router.post('/', async (req, res) => {
  const categoryData = await Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .then(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData[0]) {
      res.status(404).json({ message: 'Category not found with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({ message: 'Category not found with this id'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
