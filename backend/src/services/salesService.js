const Sale = require("../models/Sale");
const { buildQueryAndSort } = require("../utils/buildQuery");

function mapRecord(r) {
  return {
    id: r._id,
    transactionId: r["Transaction ID"],
    date: r["Date"],
    customerId: r["Customer ID"],
    customerName: r["Customer Name"],
    phoneNumber: r["Phone Number"],
    gender: r["Gender"],
    age: r["Age"],
    customerRegion: r["Customer Region"],
    customerType: r["Customer Type"],
    productId: r["Product ID"],
    productName: r["Product Name"],
    brand: r["Brand"],
    productCategory: r["Product Category"],
    tags: typeof r["Tags"] === "string" ? r["Tags"].split(",") : r["Tags"],
    quantity: r["Quantity"],
    pricePerUnit: r["Price per Unit"],
    discountPercentage: r["Discount Percentage"],
    totalAmount: r["Total Amount"],
    finalAmount: r["Final Amount"],
    paymentMethod: r["Payment Method"],
    orderStatus: r["Order Status"],
    deliveryType: r["Delivery Type"],
    storeId: r["Store ID"],
    storeLocation: r["Store Location"],
    salespersonId: r["Salesperson ID"],
    employeeName: r["Employee Name"]
  };
}

async function getSales(params) {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const { query, sort } = buildQueryAndSort(params);

  const [rawItems, total] = await Promise.all([
    Sale.find(query).sort(sort).skip(skip).limit(limit),
    Sale.countDocuments(query)
  ]);

  const items = rawItems.map(mapRecord);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  };
}

module.exports = { getSales };
