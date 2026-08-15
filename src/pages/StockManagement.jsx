import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  RefreshCw,
  X,
  Save,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/products";

const formatNumber = (number) =>
  new Intl.NumberFormat("en-PK").format(number || 0);

export default function StockManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showStockIn, setShowStockIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [stockForm, setStockForm] = useState({
    quantity: "",
    note: "",
  });

  const [savingStock, setSavingStock] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Stock products error:", error);
      setError("Backend server is not connected.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return products;

    return products.filter(
      (product) =>
        product.model?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText)
    );
  }, [products, search]);

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  const lowStock = products.filter(
    (product) => Number(product.stock || 0) <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock || 0) === 0
  ).length;

  const openStockIn = (product) => {
    setSelectedProduct(product);

    setStockForm({
      quantity: "",
      note: "",
    });

    setShowStockIn(true);
  };

  const closeStockIn = () => {
    if (savingStock) return;

    setShowStockIn(false);
    setSelectedProduct(null);

    setStockForm({
      quantity: "",
      note: "",
    });
  };

  const handleStockIn = async (e) => {
    e.preventDefault();

    if (!selectedProduct) return;

    const quantity = Number(stockForm.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      setSavingStock(true);

      const response = await fetch(
        `${API_URL}/${selectedProduct.id}/stock-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
            note: stockForm.note.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("Stock In API:", data);

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to add stock");
        return;
      }

      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? data.product
            : product
        )
      );

      closeStockIn();

      alert("Stock added successfully.");

    } catch (error) {
      console.error("Stock In Error:", error);
      alert("Backend server is not connected.");
    } finally {
      setSavingStock(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-50 p-2.5 text-slate-900">

      {/* HEADER */}
      <div className="mb-2.5 flex shrink-0 items-center justify-between">
        <div>
          <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
            <Boxes size={12} />
            Inventory Management
          </div>

          <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
            Stock Management
          </h1>

          <p className="mt-0.5 text-[10px] text-slate-500">
            Monitor and manage product inventory.
          </p>
        </div>

        <button
          onClick={fetchProducts}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={13}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="mb-2.5 grid shrink-0 grid-cols-4 gap-2">

        <StockStat
          icon={<Package size={15} />}
          title="Total Products"
          value={products.length}
        />

        <StockStat
          icon={<Boxes size={15} />}
          title="Total Stock"
          value={formatNumber(totalStock)}
        />

        <StockStat
          icon={<AlertTriangle size={15} />}
          title="Low Stock"
          value={lowStock}
        />

        <StockStat
          icon={<ArrowDownToLine size={15} />}
          title="Out of Stock"
          value={outOfStock}
        />

      </div>

      {/* MAIN CARD */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* TOOLBAR */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-3 py-2">

          <div className="relative w-full max-w-sm">

            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search model or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />

          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="m-3 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2">

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={14}
                className="text-red-600"
              />

              <p className="text-xs font-medium text-red-700">
                {error}
              </p>

            </div>

            <button
              onClick={fetchProducts}
              className="text-[10px] font-semibold text-red-600 hover:text-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* TABLE */}
        <div className="min-h-0 flex-1 overflow-auto">

          <table className="w-full min-w-[760px] text-left">

            <thead className="sticky top-0 z-10 bg-slate-50">

              <tr className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-500">

                <th className="px-3 py-2 font-semibold">
                  Product / Model
                </th>

                <th className="px-3 py-2 font-semibold">
                  Category
                </th>

                <th className="px-3 py-2 font-semibold">
                  Current Stock
                </th>

                <th className="px-3 py-2 font-semibold">
                  Stock Status
                </th>

                <th className="px-3 py-2 text-right font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center">

                    <RefreshCw
                      size={24}
                      className="mx-auto mb-2 animate-spin text-blue-500"
                    />

                    <p className="text-xs font-semibold text-slate-600">
                      Loading stock...
                    </p>

                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center">

                    <Package
                      size={30}
                      className="mx-auto mb-2 text-slate-300"
                    />

                    <p className="text-xs font-semibold text-slate-600">
                      No products found
                    </p>

                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {

                  const stock = Number(product.stock || 0);

                  const stockStatus =
                    stock === 0
                      ? "Out of Stock"
                      : stock <= 5
                        ? "Low Stock"
                        : "In Stock";

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-blue-50/40"
                    >

                      {/* PRODUCT */}
                      <td className="px-3 py-2">

                        <div className="flex items-center gap-2">

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                            <Package size={14} />
                          </div>

                          <div>

                            <p className="text-xs font-semibold leading-tight text-slate-800">
                              {product.model}
                            </p>

                            <p className="mt-0.5 text-[9px] text-slate-400">
                              GFC Product
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}
                      <td className="px-3 py-2">

                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                          {product.category}
                        </span>

                      </td>

                      {/* STOCK */}
                      <td className="px-3 py-2">

                        <div className="flex items-center gap-1.5">

                          <span
                            className={`text-sm font-bold ${
                              stock === 0
                                ? "text-red-600"
                                : stock <= 5
                                  ? "text-amber-600"
                                  : "text-slate-800"
                            }`}
                          >
                            {formatNumber(stock)}
                          </span>

                          <span className="text-[9px] text-slate-400">
                            units
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className="px-3 py-2">

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                            stock === 0
                              ? "bg-red-50 text-red-700"
                              : stock <= 5
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700"
                          }`}
                        >

                          <span
                            className={`h-1 w-1 rounded-full ${
                              stock === 0
                                ? "bg-red-500"
                                : stock <= 5
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                          />

                          {stockStatus}

                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-3 py-2">

                        <div className="flex justify-end gap-1">

                          <button
                            onClick={() => openStockIn(product)}
                            className="flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600 transition hover:bg-blue-100"
                          >
                            <ArrowDownToLine size={11} />
                            Stock In
                          </button>

                          <button
                            disabled
                            title="Stock Out - Coming Next"
                            className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-400"
                          >
                            <ArrowUpFromLine size={11} />
                            Stock Out
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-3 py-1.5">

          <p className="text-[9px] text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {products.length}
            </span>{" "}
            products
          </p>

          <p className="text-[9px] text-slate-400">
            Stock data from database
          </p>

        </div>

      </div>

      {/* STOCK IN MODAL */}
      {showStockIn && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

              <div>

                <div className="flex items-center gap-1.5">

                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                    <ArrowDownToLine size={14} />
                  </div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Add Stock
                  </h2>

                </div>

                <p className="mt-1 text-[10px] text-slate-500">
                  {selectedProduct.model}
                </p>

              </div>

              <button
                onClick={closeStockIn}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleStockIn}
              className="space-y-3 p-4"
            >

              {/* CURRENT STOCK */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">

                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-medium text-slate-500">
                    Current Stock
                  </span>

                  <span className="text-sm font-bold text-slate-800">
                    {formatNumber(selectedProduct.stock)} units
                  </span>

                </div>

              </div>

              {/* QUANTITY */}
              <div>

                <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                  Quantity to Add
                </label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 50"
                  value={stockForm.quantity}
                  onChange={(e) =>
                    setStockForm({
                      ...stockForm,
                      quantity: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  required
                  autoFocus
                />

              </div>

              {/* NOTE */}
              <div>

                <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                  Note
                </label>

                <textarea
                  rows="3"
                  placeholder="e.g. New stock received from factory"
                  value={stockForm.note}
                  onChange={(e) =>
                    setStockForm({
                      ...stockForm,
                      note: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

              </div>

              {/* PREVIEW */}
              {Number(stockForm.quantity) > 0 && (
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">

                  <div className="flex items-center justify-between">

                    <span className="text-[10px] font-medium text-blue-600">
                      New Stock
                    </span>

                    <span className="text-sm font-bold text-blue-700">
                      {formatNumber(
                        Number(selectedProduct.stock || 0) +
                          Number(stockForm.quantity || 0)
                      )}{" "}
                      units
                    </span>

                  </div>

                </div>
              )}

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">

                <button
                  type="button"
                  onClick={closeStockIn}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingStock}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                >

                  {savingStock ? (
                    <RefreshCw
                      size={13}
                      className="animate-spin"
                    />
                  ) : (
                    <Save size={13} />
                  )}

                  {savingStock ? "Adding..." : "Add Stock"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function StockStat({ icon, title, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">

      <div className="flex items-center gap-2">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>

          <p className="text-[9px] text-slate-500">
            {title}
          </p>

          <p className="mt-0.5 text-base font-bold leading-none text-slate-900">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}