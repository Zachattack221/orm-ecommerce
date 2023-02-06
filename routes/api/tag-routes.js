const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`

router.get('/:id', async (req, res) => {
  try {
    const tagFromId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagFromId) {
      res.status(404).json({ message: 'Tag not found with this id' });
      return;
    }
    res.status(200).json(tagFromId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value

router.put('/:id', async (req, res) => {
  try {
    const updatedFromId = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedFromId) {
      res.status(400).json({ message: 'No Tag exists with this id' });
      return;
    }
    res.status(200).json(updatedFromId)
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const deleteTagFromId = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTagFromId) {
      res.status(400).json({ message: 'No Tag found with this id' });
      return;
    }
    res.status(200).json(deleteTagFromId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
