const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model("Sale", saleSchema, "sales");
