const express = require("express");
const { Deta } = require("deta");

// ALL OUR DATA IS STORE AT DETA BASE
// YOU CAN USE OUR DATA AT /src/data WITH ALL CHARACTERS INFO...

const deta = Deta(process.env.DETA_KEY);
const gg_data = deta.Base("gg_charcts_data");
const list = require("../data/list");

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json({
    status: 200,
    list,
  });
});

router.get("/search", async (req, res, next) => {
  const result = list.filter((e) => e.character_id.includes(req.query.q));
  try {
    if (req.query.q) {
      res.status(200).json({
        status: 200,
        result,
      });
    } else if (result.length === 0) {
      res.status(404).json({
        status: 404,
        message: "NOT FOUND",
      });
    } else if (!req.query.q) {
      res.status(400).json({
        status: 400,
        message: "BAD REQUEST",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const data = await gg_data.get(req.params.id);
  try {
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
