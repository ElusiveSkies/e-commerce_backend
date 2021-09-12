const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// finds all tags
router.get("/", (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    // displays json of tags including products
    .then((tags) => {
      res.json(tags);
    })
    // displays errors
    .catch((err) => {
      res.status(500).json(err);
    });
});

// finds a single tag by its `id`
router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product],
  })
    // displays json of tags
    .then((tags) => {
      res.json(tags);
    })
    // displays errors
    .catch((err) => res.json(err));
});

// creates a new tag
router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      return res.json(newTag);
    })
    .catch((err) => res.json(err));
});

// updates a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: { id: req.params.id },
    }
  )
    // displays number of tags updated
    .then((updatedTag) => {
      return res.json(updatedTag);
    })
    // displays errors
    .catch((err) => res.json(err));
});

// deletes on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })
    // displays number of tags deleted
    .then((removeTag) => {
      return res.json(removeTag);
    })
    // displays errors
    .catch((err) => res.json(err));
});

module.exports = router;
