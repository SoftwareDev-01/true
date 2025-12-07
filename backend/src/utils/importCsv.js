const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Sale = require("../models/Sale");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const CSV_PATH = process.env.CSV_PATH || "../data/sales.csv";

async function connect() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
}

function mapRow(row) {
  return {
    transactionId: row["Transaction ID"],
    date: row["Date"] ? new Date(row["Date"]) : null,
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: row["Age"] ? Number(row["Age"]) : null,
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],
    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],
    tags: row["Tags"] ? row["Tags"].split("|").map((t) => t.trim()) : [],
    quantity: row["Quantity"] ? Number(row["Quantity"]) : null,
    pricePerUnit: row["Price per Unit"]
      ? Number(row["Price per Unit"])
      : null,
    discountPercentage: row["Discount Percentage"]
      ? Number(row["Discount Percentage"])
      : null,
    totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : null,
    finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : null,
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"]
  };
}

async function importCsv() {
  await connect();

  const filePath = path.resolve(__dirname, CSV_PATH);

  if (!fs.existsSync(filePath)) {
    console.error("CSV not found:", filePath);
    process.exit(1);
  }

  console.log("Deleting old records before import...");
  await Sale.deleteMany({});
  console.log("Import started...");

  let inserted = 0;

  const stream = fs.createReadStream(filePath).pipe(csv());

  stream.on("data", async (row) => {
    stream.pause(); 
    try {
      await Sale.create(mapRow(row));
      inserted++;
      if (inserted % 1000 === 0) console.log(`Inserted: ${inserted}`);
    } catch (err) {
      console.error("Row insert error:", err.message);
    }
    stream.resume();
  });

  stream.on("end", async () => {
    console.log(`CSV import complete. Total rows imported: ${inserted}`);
    await mongoose.disconnect();
    process.exit(0);
  });

  stream.on("error", (err) => {
    console.error("CSV read error:", err);
    process.exit(1);
  });
}

importCsv();
