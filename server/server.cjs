const express = require("express");
const cors = require("cors");

const db = require("./database/database.cjs");
const productsRouter = require("./routes/products.cjs");
app.use("/api/products", productsRouter);
const app = express();

const PORT = 5000;


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// TEST ROUTE
// ==============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "GFC ERP Backend is running",
  });
});

// ==============================
// DATABASE TEST ROUTE
// ==============================

app.get("/api/database-test", (req, res) => {
  try {
    const result = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();

    res.json({
      success: true,
      message: "Database connected successfully",
      tables: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {
  console.log(`
========================================
 GFC ERP Backend
========================================
 Server: http://localhost:${PORT}
 Status: Running
========================================
  `);
});
