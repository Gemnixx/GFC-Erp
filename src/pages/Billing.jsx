import { useMemo, useState } from "react";
import {
  ShoppingCart,
  User,
  Phone,
  Package,
  Trash2,
  Plus,
  Minus,
  Printer,
  Receipt,
  Search,
  X,
  Tag,
  Calculator,
} from "lucide-react";

import { categories } from "../data/products";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PK").format(price);

const generateBillNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `GFC-${year}${month}${day}-${random}`;
};

const getToday = () => {
  return new Date().toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Billing() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [discount, setDiscount] = useState("");

  const [cart, setCart] = useState([]);

  const [billNumber] = useState(generateBillNumber());

  /*
   * Products belonging to selected category
   */
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];

    return initialProducts.filter(
      (product) => product.category === selectedCategory
    );
  }, [selectedCategory]);

  /*
   * Selected product object
   */
  const currentProduct = useMemo(() => {
    return initialProducts.find(
      (product) => product.id === Number(selectedProduct)
    );
  }, [selectedProduct]);

  /*
   * Cart subtotal
   */
  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  /*
   * Discount
   */
  const discountAmount = Math.min(
    Number(discount) || 0,
    subtotal
  );

  /*
   * Grand total
   */
  const grandTotal = Math.max(
    subtotal - discountAmount,
    0
  );

  /*
   * Select category
   */
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedProduct("");
    setQuantity(1);
  };

  /*
   * Add product to bill
   */
  const addToBill = () => {
    if (!currentProduct) return;

    const qty = Number(quantity) || 1;

    if (qty < 1) return;

    if (qty > currentProduct.stock) {
      alert(
        `Only ${currentProduct.stock} units available in stock.`
      );
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === currentProduct.id
      );

      if (existing) {
        const newQuantity = existing.quantity + qty;

        if (newQuantity > currentProduct.stock) {
          alert(
            `Only ${currentProduct.stock} units available in stock.`
          );

          return prev;
        }

        return prev.map((item) =>
          item.id === currentProduct.id
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: currentProduct.id,
          category: currentProduct.category,
          model: currentProduct.model,
          price: currentProduct.price,
          quantity: qty,
        },
      ];
    });

    setSelectedProduct("");
    setQuantity(1);
  };

  /*
   * Increase quantity
   */
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const product = initialProducts.find(
          (p) => p.id === id
        );

        if (!product) return item;

        if (item.quantity >= product.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  /*
   * Decrease quantity
   */
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /*
   * Remove item
   */
  const removeItem = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /*
   * Clear bill
   */
  const clearBill = () => {
    if (cart.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear this bill?"
    );

    if (!confirmed) return;

    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setDiscount("");
    setSelectedCategory("");
    setSelectedProduct("");
    setQuantity(1);
  };

  /*
   * Print 80mm receipt
   */
  const printReceipt = () => {
    if (cart.length === 0) {
      alert("Please add at least one product to the bill.");
      return;
    }

    const receiptItems = cart
      .map(
        (item) => `
          <div class="item">
            <div class="item-top">
              <strong>${item.model}</strong>
              <strong>Rs. ${formatPrice(
                item.price * item.quantity
              )}</strong>
            </div>

            <div class="category">
              ${item.category}
            </div>

            <div class="item-bottom">
              ${item.quantity} × Rs. ${formatPrice(item.price)}
            </div>
          </div>
        `
      )
      .join("");

    const printWindow = window.open(
      "",
      "_blank",
      "width=420,height=700"
    );

    if (!printWindow) {
      alert(
        "Printing window was blocked. Please allow pop-ups."
      );
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${billNumber}</title>

          <style>
            * {
              box-sizing: border-box;
            }

            @page {
              size: 80mm auto;
              margin: 0;
            }

            html,
            body {
              width: 80mm;
              margin: 0;
              padding: 0;
              background: white;
            }

            body {
              font-family:
                Arial,
                Helvetica,
                sans-serif;

              color: #111;
              font-size: 11px;
              line-height: 1.35;
              padding: 5mm 4mm;
            }

            .center {
              text-align: center;
            }

            .logo {
              font-size: 22px;
              font-weight: 800;
              letter-spacing: 1px;
            }

            .company {
              font-size: 10px;
              margin-top: 2px;
              color: #444;
            }

            .line {
              border-top: 1px dashed #222;
              margin: 9px 0;
            }

            .bill-info {
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              margin-bottom: 2px;
            }

            .customer {
              margin-top: 6px;
              font-size: 10px;
            }

            .item {
              padding: 6px 0;
              border-bottom: 1px dashed #bbb;
            }

            .item-top {
              display: flex;
              justify-content: space-between;
              gap: 5px;
              font-size: 11px;
            }

            .category {
              font-size: 9px;
              color: #555;
              margin-top: 2px;
            }

            .item-bottom {
              font-size: 9px;
              color: #555;
              margin-top: 2px;
            }

            .summary {
              margin-top: 8px;
            }

            .summary-row {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
            }

            .grand-total {
              font-size: 14px;
              font-weight: 800;
              border-top: 1px solid #111;
              border-bottom: 1px solid #111;
              padding: 6px 0;
              margin-top: 6px;
            }

            .footer {
              text-align: center;
              margin-top: 15px;
              font-size: 9px;
              color: #555;
            }

            .thank {
              font-weight: 700;
              color: #111;
              margin-bottom: 3px;
            }
          </style>
        </head>

        <body>

          <div class="center">
            <div class="logo">GFC</div>
            <div class="company">
              GFC Fans & Appliances
            </div>
            <div class="company">
              Sales Receipt
            </div>
          </div>

          <div class="line"></div>

          <div class="bill-info">
            <span>Bill No.</span>
            <strong>${billNumber}</strong>
          </div>

          <div class="bill-info">
            <span>Date</span>
            <span>${getToday()}</span>
          </div>

          ${
            customerName
              ? `
                <div class="customer">
                  <strong>Customer:</strong>
                  ${customerName}
                </div>
              `
              : ""
          }

          ${
            customerPhone
              ? `
                <div class="customer">
                  <strong>Phone:</strong>
                  ${customerPhone}
                </div>
              `
              : ""
          }

          <div class="line"></div>

          ${receiptItems}

          <div class="summary">

            <div class="summary-row">
              <span>Subtotal</span>
              <strong>
                Rs. ${formatPrice(subtotal)}
              </strong>
            </div>

            ${
              discountAmount > 0
                ? `
                  <div class="summary-row">
                    <span>Discount</span>
                    <strong>
                      - Rs. ${formatPrice(discountAmount)}
                    </strong>
                  </div>
                `
                : ""
            }

            <div class="summary-row grand-total">
              <span>TOTAL</span>
              <span>
                Rs. ${formatPrice(grandTotal)}
              </span>
            </div>

          </div>

          <div class="footer">
            <div class="thank">
              Thank you for your purchase!
            </div>

            Please visit us again.
          </div>

        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <div className="flex min-h-0 flex-col gap-3">

      {/* PAGE HEADER */}
      <div className="flex shrink-0 items-center justify-between">

        <div>
          <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
            <Receipt size={12} />
            Sales & Billing
          </div>

          <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
            Create New Bill
          </h1>

          <p className="mt-0.5 text-[10px] text-slate-500">
            Create sales invoices and print 80mm receipts.
          </p>
        </div>

        <button
          onClick={clearBill}
          disabled={cart.length === 0}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={13} />
          Clear Bill
        </button>

      </div>

      {/* MAIN BILLING AREA */}
      <div className="grid min-h-0 grid-cols-1 gap-3 xl:grid-cols-[1fr_390px]">

        {/* LEFT SIDE */}
        <div className="min-w-0 space-y-3">

          {/* CUSTOMER */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <User size={14} />
              </div>

              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  Customer Information
                </h2>

                <p className="text-[9px] text-slate-400">
                  Optional customer details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

              <div className="relative">
                <User
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Customer name"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div className="relative">
                <Phone
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(e.target.value)
                  }
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

            </div>
          </div>

          {/* PRODUCT SELECTION */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <Package size={14} />
              </div>

              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  Add Product
                </h2>

                <p className="text-[9px] text-slate-400">
                  Select category first, then choose a product.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1.4fr_100px_auto]">

              {/* CATEGORY */}
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {/* PRODUCT */}
              <select
                value={selectedProduct}
                onChange={(e) =>
                  setSelectedProduct(e.target.value)
                }
                disabled={!selectedCategory}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {selectedCategory
                    ? "Select Product / Model"
                    : "Select category first"}
                </option>

                {categoryProducts.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.model} — Rs.{" "}
                    {formatPrice(product.price)}
                  </option>
                ))}
              </select>

              {/* QUANTITY */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                  className="flex h-full w-8 items-center justify-center text-slate-500 hover:text-blue-600"
                >
                  <Minus size={13} />
                </button>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        Number(e.target.value) || 1
                      )
                    )
                  }
                  className="w-full bg-transparent text-center text-xs font-semibold outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  className="flex h-full w-8 items-center justify-center text-slate-500 hover:text-blue-600"
                >
                  <Plus size={13} />
                </button>

              </div>

              {/* ADD */}
              <button
                type="button"
                onClick={addToBill}
                disabled={!currentProduct}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={14} />
                Add
              </button>

            </div>

            {/* PRODUCT PREVIEW */}
            {currentProduct && (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">

                <div className="flex items-center gap-2">

                  <Tag
                    size={13}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-[10px] font-semibold text-slate-700">
                      {currentProduct.category}
                    </p>

                    <p className="text-[9px] text-slate-400">
                      {currentProduct.model}
                    </p>
                  </div>

                </div>

                <div className="text-right">

                  <p className="text-xs font-bold text-slate-800">
                    Rs.{" "}
                    {formatPrice(
                      currentProduct.price
                    )}
                  </p>

                  <p className="text-[9px] text-slate-400">
                    Stock: {currentProduct.stock}
                  </p>

                </div>

              </div>
            )}

          </div>

          {/* CART */}
          <div className="flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-3 py-2.5">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <ShoppingCart size={14} />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-slate-800">
                    Current Bill
                  </h2>

                  <p className="text-[9px] text-slate-400">
                    {cart.length} product
                    {cart.length !== 1 ? "s" : ""} added
                  </p>
                </div>

              </div>

              <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-500">
                {billNumber}
              </span>

            </div>

            <div className="min-h-0 flex-1 overflow-auto">

              {cart.length === 0 ? (

                <div className="flex h-full min-h-[250px] items-center justify-center">

                  <div className="text-center">

                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-300">
                      <ShoppingCart size={20} />
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      No products added
                    </p>

                    <p className="mt-0.5 text-[9px] text-slate-400">
                      Select a category and product above.
                    </p>

                  </div>

                </div>

              ) : (

                <table className="w-full text-left">

                  <thead className="sticky top-0 z-10 bg-slate-50">

                    <tr className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-400">

                      <th className="px-3 py-2">
                        Product
                      </th>

                      <th className="px-3 py-2 text-center">
                        Qty
                      </th>

                      <th className="px-3 py-2 text-right">
                        Total
                      </th>

                      <th className="w-8" />

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {cart.map((item) => (

                      <tr key={item.id}>

                        <td className="px-3 py-2">

                          <div className="flex items-center gap-2">

                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                              <Package size={13} />
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-[10px] font-semibold text-slate-700">
                                {item.model}
                              </p>

                              <p className="truncate text-[9px] text-slate-400">
                                {item.category}
                              </p>

                              <p className="text-[9px] text-slate-400">
                                Rs.{" "}
                                {formatPrice(item.price)}
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="px-2 py-2">

                          <div className="mx-auto flex w-fit items-center rounded-md border border-slate-200">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center text-slate-500 hover:text-blue-600"
                            >
                              <Minus size={10} />
                            </button>

                            <span className="w-6 text-center text-[10px] font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center text-slate-500 hover:text-blue-600"
                            >
                              <Plus size={10} />
                            </button>

                          </div>

                        </td>

                        <td className="px-3 py-2 text-right">

                          <p className="text-[10px] font-bold text-slate-700">
                            Rs.{" "}
                            {formatPrice(
                              item.price *
                                item.quantity
                            )}
                          </p>

                        </td>

                        <td className="px-2 py-2">

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={12} />
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              )}

            </div>

          </div>

        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="min-w-0">

          <div className="sticky top-3 rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-3 py-2.5">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <Calculator size={14} />
                </div>

                <div>

                  <h2 className="text-xs font-bold text-slate-800">
                    Bill Summary
                  </h2>

                  <p className="text-[9px] text-slate-400">
                    Review before printing
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-3 p-3">

              {/* Bill info */}
              <div className="rounded-lg bg-slate-50 p-2.5">

                <div className="flex justify-between">

                  <span className="text-[9px] text-slate-400">
                    Bill Number
                  </span>

                  <span className="text-[9px] font-semibold text-slate-600">
                    {billNumber}
                  </span>

                </div>

                <div className="mt-1 flex justify-between">

                  <span className="text-[9px] text-slate-400">
                    Date
                  </span>

                  <span className="text-[9px] font-semibold text-slate-600">
                    {getToday()}
                  </span>

                </div>

              </div>

              {/* Discount */}
              <div>

                <label className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                  <Tag size={11} />
                  Discount
                </label>

                <div className="relative">

                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(e.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* Totals */}
              <div className="border-t border-slate-100 pt-3">

                <div className="flex justify-between text-xs">

                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-slate-700">
                    Rs. {formatPrice(subtotal)}
                  </span>

                </div>

                <div className="mt-2 flex justify-between text-xs">

                  <span className="text-slate-500">
                    Discount
                  </span>

                  <span className="font-semibold text-emerald-600">
                    - Rs.{" "}
                    {formatPrice(discountAmount)}
                  </span>

                </div>

                <div className="mt-3 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-3">

                  <span className="text-xs font-bold text-slate-700">
                    Grand Total
                  </span>

                  <span className="text-lg font-extrabold text-blue-600">
                    Rs. {formatPrice(grandTotal)}
                  </span>

                </div>

              </div>

              {/* Print */}
              <button
                type="button"
                onClick={printReceipt}
                disabled={cart.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Printer size={15} />
                Print 80mm Receipt
              </button>

              <p className="text-center text-[9px] text-slate-400">
                Optimized for 80mm thermal printers
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Billing;