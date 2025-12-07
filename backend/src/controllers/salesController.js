const { getSales } = require("../services/salesService");

async function getSalesHandler(req, res) {
  try {
    const data = await getSales(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getSalesHandler };
