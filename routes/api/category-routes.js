const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories, be sure to include its associated Products
// async
// router.get('/', (req, res) => {
//   // const categoryData = await 
//   Category.findAll({
//     attributes: ['id', 'category_name'],
//     include: [
//       {
//         model: Product,
//         attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
//       }
//     ]
//   }).then(categoryData => res.json(categoryData)).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// // find one category by its `id` value, be sure to include its associated Products
// // async 
// router.get('/:id',(req, res) => {
//   // const categoryData = await 
//   Category.findOne({
//     where: {
//       id: req.params.id,
//       attribute: ['id','category_name'],
//       include: [
//         {
//           model: Product,
//           attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
//         }
//       ]
//     }
//   })
//   .then(categoryData => {
//     if (!categoryData) {
//       res.status(404).json({message: 'Category not found with this id'});
//       return;
//     }
//     res.json(categoryData);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// // create a new category
// // async 
// router.post('/',(req, res) => {
//   // const categoryData = await 
//   Category.create({
//     category_name: req.body.category_name
//   })
//   .then(categoryData => res.json(categoryData))
//   .then(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// // update a category by its `id` value
// // async 
// router.put('/:id',(req, res) => {
//   // const categoryData = await 
//   Category.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(categoryData => {
//     if(!categoryData[0]) {
//       res.status(404).json({ message: 'Category not found with this id'});
//       return;
//     }
//     res.json(categoryData);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// // delete a category by its `id` value
// // async 
// router.delete('/:id',(req, res) => {
//   // const categoryData = await 
//   Category.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(categoryData => {
//     if(!categoryData) {
//       res.status(404).json({ message: 'Category not found with this id'});
//       return;
//     }
//     res.json(categoryData);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

// module.exports = router;
// Attempting async format


// find all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryById) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategoryById = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateCategoryById) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(updateCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategoryById = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategoryById) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;