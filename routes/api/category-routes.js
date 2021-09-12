const router = require("express").Router();
const { Category, Product } = require("../../models");

// finds all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    // displays categories including products
    .then((categories) => {
      res.json(categories);
    })
    // displays errors
    .catch((err) => {
      res.status(500).json(err);
    });
});

// finds one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {
    include: [Product],
  })
    // displays json of category
    .then((categories) => {
      res.json(categories);
    })
    // displays errors
    .catch((err) => res.json(err));
});

// creates a new category
router.post("/", (req, res) => {
  Category.create(req.body)
    // displays json of newly created category
    .then((newCategory) => {
      return res.json(newCategory);
    })
    // displays errors
    .catch((err) => res.json(err));
});

// updates a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: { id: req.params.id },
    }
  )
    // displays number of categories updated
    .then((updatedCategory) => {
      return res.json(updatedCategory);
    })
    // displays errors
    .catch((err) => res.json(err));
});

// deletes a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    // displays number of categories deleted
    .then((removeCategory) => {
      return res.json(removeCategory);
    })
    // displays errors
    .catch((err) => res.json(err));
});

module.exports = router;
