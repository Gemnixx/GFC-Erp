const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Database folder
const dbFolder = __dirname;

// Database file
const dbPath = path.join(dbFolder, "gfc-erp.db");

// Create database
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// ==============================
// PRODUCTS TABLE
// ==============================
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    model TEXT NOT NULL UNIQUE,
    price REAL NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

// ==============================
// CUSTOMERS TABLE
// ==============================
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

// ==============================
// SALES TABLE
// ==============================
db.exec(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bill_number TEXT NOT NULL UNIQUE,
    customer_id INTEGER,
    subtotal REAL NOT NULL DEFAULT 0,
    discount REAL NOT NULL DEFAULT 0,
    grand_total REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
      REFERENCES customers(id)
      ON DELETE SET NULL
  );
`);

// ==============================
// SALE ITEMS TABLE
// ==============================
db.exec(`
  CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    model TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    total REAL NOT NULL,

    FOREIGN KEY (sale_id)
      REFERENCES sales(id)
      ON DELETE CASCADE,

    FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE RESTRICT
  );
`);

// ==============================
// PRICE HISTORY TABLE
// ==============================
db.exec(`
  CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    old_price REAL,
    new_price REAL NOT NULL,
    changed_by TEXT NOT NULL DEFAULT 'Administrator',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
      REFERENCES products(id)
      ON DELETE CASCADE
  );
`);





console.log("GFC ERP database initialized successfully.");

module.exports = db;