const express = require("express");
const router = express.Router();
const { getSalesHandler } = require("../controllers/salesController");

router.get("/", getSalesHandler);

module.exports = router;
