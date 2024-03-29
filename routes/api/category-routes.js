const router = require('express').Router();
const { Category, Product } = require('../../models');

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
    const categoryFromId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryFromId) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryFromId);
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
    const updateCategoryFromId = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateCategoryFromId) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(updateCategoryFromId);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a category by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategoryFromId = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategoryFromId) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(deleteCategoryFromId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;