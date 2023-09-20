const express = require("express");
const router = express.Router();
const { Toy, validateToy } = require("../models/toyModel");
const auth = require("../middleware/auth");

// @desc Get toys with optional search parameters
// @route GET /toys/?limit=X&page=X&category=X&q=q
// @access Public
router.get("/", async (req, res, next) => {
  let query = {};
  const limit = req.query.limit || 10;
  const page = req.query.page - 1 || 0;

  if (req.query.category) {
    const category = decodeURIComponent(req.query.category);
    const categoryQuery = new RegExp(category, "i"); // "i" for case-insensitive
    query.category = categoryQuery;
  }

  if (req.query.q) {
    const searchQuery = req.query.q;
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { info: { $regex: searchQuery, $options: "i" } },
    ];
  }

  //Search toys by query and send it
  const toys = await Toy.find(query)
    .limit(limit)
    .skip(page * limit);

  res.json(toys);
});

// @desc Get singel toy by id
// @route GET /toys/single/:id
// @access Public
router.get("single/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("toy id is required");

  const toyId = req.params.id;

  const toy = await Toy.findById(toyId);

  if (!toy) {
    return res.status(404).json({ error: "Toy not found" });
  }

  res.status(200).json(toy);
});

// @desc Post a toy
// @route POST /toys
// @access Private
router.post("/", auth, async (req, res) => {
  const { error } = validateToy(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let toy = await Toy.findOne({ name: req.body.name });
  if (toy) return res.status(400).send("Toy name already exists");

  //Add toy to db and return it
  toy = new Toy(req.body);
  toy.user_id = req.user._id;

  await toy.save();
  res.status(201).json(toy);
});

// @desc Edit a toy
// @route Put /toys/:id
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { error } = validateToy(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //Checks is toy name already exists
  let toy = await Toy.findOne({ name: req.body.name });
  if (toy) return res.status(400).json({ error: "Toy Name already exists" });

  const id = req.params.id;
  toy = await Toy.findById(id);
  if (!toy) {
    return res.status(404).json({ error: "Item not found" });
  }

  //Checks user authorization
  if (req.user._id !== toy.user_id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Update the toy
  toy = Object.assign(toy, req.body);
  toy = await toy.save();
  res.status(200).json(toy);
});

// @desc Delete a toy
// @route DELETE /toys/:id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  // Find the toy by ID
  const id = req.params.id;
  const toy = await Toy.findById(id);

  if (!toy) {
    return res.status(404).json({ error: "Not found" });
  }

  //Checks user authorization
  if (req.user._id !== toy.user_id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const deletedToy = await Toy.findOneAndRemove({ _id: id });
  res.status(200).json(deletedToy);
});

module.exports = router;
