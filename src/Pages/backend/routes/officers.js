const express = require("express");
const router = express.Router();
const Officer = require("../models/Officer");

// GET officers
router.get("/", async (req, res) => {
  const officers = await Officer.find();
  res.json(officers);
});

module.exports = router;
