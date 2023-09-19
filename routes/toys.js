const express = require("express");
const router = express.Router();
const { Toy, validateToy } = require("../models/toyModel");
const auth = require("../middleware/auth");

// Get toys with optional search parameters
router.get("/", async (req, res, next) => {
  let query = {};

  if (req.query.category) {
    const category = decodeURIComponent(req.query.category);
    const categoryQuery = new RegExp(category, "i"); // "i" for case-insensitive
    query.category = categoryQuery;
  }

  if (req.query.q) {
    console.log("q");
    const searchQuery = req.query.q;
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { info: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const toys = await Toy.find(query);
  res.json(toys);
});

router.get("/:id", async (req, res) => {
  const toyId = req.params.id;

  const toy = await Toy.findById(toyId);

  if (!toy) {
    return res.status(404).json({ error: "Toy not found" });
  }

  res.status(200).json(toy);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateToy(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let toy = await Toy.findOne({ name: req.body.name });
  if (toy) return res.status(400).send("Toy name already exists");

  toy = new Toy(req.body);
  toy.user_id = req.user._id;

  await toy.save();
  res.status(201).json(toy);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateToy(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let toy = await Toy.findOne({ name: req.body.name });
  if (toy) return res.status(400).json({ error: "Toy Name already exists" });

  const id = req.params.id;
  toy = await Toy.findById(id);
  if (!toy) {
    return res.status(404).json({ error: "Item not found" });
  }

  // ,user_id:req.tokenData._id - דואג שרק בעל הרשומה יוכל
  // למחוק את הרשומה לפי הטוקן
  if (req.user._id !== toy.user_id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Update the toy
  toy = Object.assign(toy, req.body);
  toy = await toy.save();
  res.status(200).json(toy);
});

router.delete("/:id", auth, async (req, res) => {
  // Find the toy by ID
  const id = req.params.id;
  const toy = await Toy.findById(id);

  if (!toy) {
    return res.status(404).json({ error: "Not found" });
  }

  // ,user_id:req.tokenData._id - דואג שרק בעל הרשומה יוכל
  // למחוק את הרשומה לפי הטוקן
  if (req.user._id !== toy.user_id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const deletedToy = await Toy.findOneAndRemove({ _id: id });
  res.status(200).json(deletedToy);
});

module.exports = router;
