const express = require("express");
const db = require("../database/database.cjs");

const router = express.Router();

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", (req, res) => {
  try {
    const products = db
      .prepare(`
        SELECT *
        FROM products
        ORDER BY id DESC
      `)
      .all();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get("/:id", (req, res) => {
  try {
    const product = db
      .prepare(`
        SELECT *
        FROM products
        WHERE id = ?
      `)
      .get(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

// =====================================================
// CREATE PRODUCT
// =====================================================

router.post("/", (req, res) => {
  try {
    const {
      category,
      model,
      price,
      stock,
      status = "Active",
    } = req.body;

    if (!category || !model || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Category, model and price are required",
      });
    }

    const productPrice = Number(price);
    const productStock = Number(stock) || 0;

    if (productPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    if (productStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const transaction = db.transaction(() => {
      const result = db
        .prepare(`
          INSERT INTO products
          (
            category,
            model,
            price,
            stock,
            status
          )
          VALUES (?, ?, ?, ?, ?)
        `)
        .run(
          category.trim(),
          model.trim(),
          productPrice,
          productStock,
          status
        );

      const productId = result.lastInsertRowid;

      // Save initial stock movement if stock was added
      if (productStock > 0) {
        db.prepare(`
          INSERT INTO stock_movements
          (
            product_id,
            type,
            previous_stock,
            quantity,
            new_stock,
            note,
            changed_by
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          productId,
          "IN",
          0,
          productStock,
          productStock,
          "Initial stock",
          "Administrator"
        );
      }

      return productId;
    });

    const productId = transaction();

    const product = db
      .prepare(`
        SELECT *
        FROM products
        WHERE id = ?
      `)
      .get(productId);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        success: false,
        message: "This product model already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
});

// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put("/:id", (req, res) => {
  try {
    const {
      category,
      model,
      price,
      stock,
      status,
    } = req.body;

    const productId = req.params.id;

    const existingProduct = db
      .prepare(`
        SELECT *
        FROM products
        WHERE id = ?
      `)
      .get(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const newPrice = Number(price);
    const newStock = Number(stock) || 0;

    if (newPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const transaction = db.transaction(() => {

      // Update product
      db.prepare(`
        UPDATE products
        SET
          category = ?,
          model = ?,
          price = ?,
          stock = ?,
          status = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        category.trim(),
        model.trim(),
        newPrice,
        newStock,
        status,
        productId
      );

      // ============================================
      // PRICE HISTORY
      // ============================================

      if (existingProduct.price !== newPrice) {
        db.prepare(`
          INSERT INTO price_history
          (
            product_id,
            old_price,
            new_price,
            changed_by
          )
          VALUES (?, ?, ?, ?)
        `).run(
          productId,
          existingProduct.price,
          newPrice,
          "Administrator"
        );
      }

      // ============================================
      // STOCK CHANGE HISTORY
      // ============================================

      if (existingProduct.stock !== newStock) {
        const difference = newStock - existingProduct.stock;

        db.prepare(`
          INSERT INTO stock_movements
          (
            product_id,
            type,
            previous_stock,
            quantity,
            new_stock,
            note,
            changed_by
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          productId,
          difference > 0 ? "IN" : "OUT",
          existingProduct.stock,
          Math.abs(difference),
          newStock,
          "Stock adjusted from product edit",
          "Administrator"
        );
      }
    });

    transaction();

    const updatedProduct = db
      .prepare(`
        SELECT *
        FROM products
        WHERE id = ?
      `)
      .get(productId);

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Update Product Error:", error);

    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        success: false,
        message: "This product model already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
});



// =====================================================
// GET STOCK HISTORY
// =====================================================

router.get("/:id/stock-history", (req, res) => {
  try {
    const history = db
      .prepare(`
        SELECT
          id,
          type,
          previous_stock AS previousStock,
          quantity,
          new_stock AS newStock,
          note,
          changed_by AS changedBy,
          created_at AS date
        FROM stock_movements
        WHERE product_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.id);

    res.json({
      success: true,
      history,
    });

  } catch (error) {
    console.error("Stock History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stock history",
    });
  }
});

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete("/:id", (req, res) => {
  try {
    const productId = req.params.id;

    const existingProduct = db
      .prepare(`
        SELECT *
        FROM products
        WHERE id = ?
      `)
      .get(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    db.prepare(`
      DELETE FROM products
      WHERE id = ?
    `).run(productId);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
});

// =====================================================
// GET PRICE HISTORY
// =====================================================

router.get("/:id/history", (req, res) => {
  try {
    const history = db
      .prepare(`
        SELECT
          id,
          old_price AS oldPrice,
          new_price AS newPrice,
          changed_by AS changedBy,
          created_at AS date
        FROM price_history
        WHERE product_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.id);

    res.json({
      success: true,
      history,
    });

  } catch (error) {
    console.error("Price History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch price history",
    });
  }
});

// =====================================================
// EXPORT
// =====================================================

module.exports = router;