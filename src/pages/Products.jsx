import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  History,
  Package,
  Tag,
  Boxes,
  X,
  Save,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { categories } from "../data/products";

const formatPrice = (price) => new Intl.NumberFormat("en-PK").format(price);

const today = () => new Date().toISOString().split("T")[0];

export default function Products() {
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products API:", data);

        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((error) => {
        console.error("Products fetch error:", error);
      });
  }, []);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [historyProduct, setHistoryProduct] = useState(null);

  const [form, setForm] = useState({
    category: categories[0],
    model: "",
    price: "",
    stock: "",
    status: "Active",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        product.model.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const resetForm = () => {
    setForm({
      category: categories[0],
      model: "",
      price: "",
      stock: "",
      status: "Active",
    });

    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    setForm({
      category: product.category,
      model: product.model,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.model.trim() || !form.price) return;

    try {
      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct.id}`
        : "http://localhost:5000/api/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: form.category,
          model: form.model.trim(),
          price: Number(form.price),
          stock: Number(form.stock) || 0,
          status: form.status,
        }),
      });

      const data = await response.json();

      console.log("Product API:", data);

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProduct.id ? data.product : product,
          ),
        );
      } else {
        setProducts((prev) => [data.product, ...prev]);
      }

      closeForm();
    } catch (error) {
      console.error("Save product error:", error);
      alert("Backend server is not connected.");
    }
  };

  const deleteProduct = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log("Delete Product API:", data);

    if (!response.ok || !data.success) {
      alert(data.message || "Failed to delete product");
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );

  } catch (error) {
    console.error("Delete product error:", error);
    alert("Backend server is not connected.");
  }
};

  const openHistory = async (product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${product.id}/history`,
      );

      const data = await response.json();

      console.log("Price History API:", data);

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to load price history");
        return;
      }

      setHistoryProduct({
        ...product,
        priceHistory: data.history,
      });

      setShowHistory(true);
    } catch (error) {
      console.error("Price history error:", error);
      alert("Backend server is not connected.");
    }
  };

  const closeHistory = () => {
    setShowHistory(false);
    setHistoryProduct(null);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-50 p-2.5 text-slate-900">
      {/* HEADER */}
      <div className="mb-2.5 flex shrink-0 items-center justify-between">
        <div>
          <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
            <Package size={12} />
            Inventory Management
          </div>

          <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
            Products & Models
          </h1>

          <p className="mt-0.5 text-[10px] text-slate-500">
            Manage products, models, prices and stock.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="mb-2.5 grid shrink-0 grid-cols-3 gap-2">
        <StatCard
          icon={<Package size={15} />}
          title="Total Products"
          value={products.length}
        />

        <StatCard
          icon={<Tag size={15} />}
          title="Categories"
          value={categories.length}
        />

        <StatCard
          icon={<Boxes size={15} />}
          title="Total Stock"
          value={products.reduce((total, product) => total + product.stock, 0)}
        />
      </div>

      {/* PRODUCTS CARD */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-3 py-2">
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

          <div className="relative shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-3 pr-8 text-xs font-medium outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* SCROLL AREA */}
        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr className="border-b border-slate-200 text-[9px] uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2 font-semibold">Product / Model</th>

                <th className="px-3 py-2 font-semibold">Category</th>

                <th className="px-3 py-2 font-semibold">Current Price</th>

                <th className="px-3 py-2 font-semibold">Stock</th>

                <th className="px-3 py-2 font-semibold">Status</th>

                <th className="px-3 py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-10 text-center">
                    <Package
                      size={30}
                      className="mx-auto mb-2 text-slate-300"
                    />

                    <p className="text-xs font-semibold text-slate-600">
                      No products found
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Try another search or add a new product.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => openEditModal(product)}
                    className="cursor-pointer transition hover:bg-blue-50/40"
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

                    {/* PRICE */}
                    <td className="px-3 py-2">
                      <p className="text-xs font-bold text-slate-800">
                        Rs. {formatPrice(product.price)}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openHistory(product);
                        }}
                        className="mt-0.5 flex items-center gap-1 text-[9px] font-medium text-blue-600 transition hover:text-blue-700"
                      >
                        <History size={10} />
                        Price History
                      </button>
                    </td>

                    {/* STOCK */}
                    <td className="px-3 py-2">
                      <span
                        className={`text-xs font-semibold ${
                          product.stock <= 5 ? "text-red-600" : "text-slate-700"
                        }`}
                      >
                        {product.stock}
                      </span>

                      <span className="ml-1 text-[9px] text-slate-400">
                        units
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          product.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <span
                          className={`h-1 w-1 rounded-full ${
                            product.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {product.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openHistory(product);
                          }}
                          title="Price History"
                          className="rounded-md border border-slate-200 p-1 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <History size={13} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(product);
                          }}
                          title="Edit Product"
                          className="rounded-md border border-slate-200 p-1 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={13} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product.id);
                          }}
                          title="Delete Product"
                          className="rounded-md border border-slate-200 p-1 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

          <p className="text-[9px] text-slate-400">Scroll to view more</p>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  {editingProduct
                    ? "Update product information and price."
                    : "Create a new GFC product model."}
                </p>
              </div>

              <button
                onClick={closeForm}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 p-4">
              {/* CATEGORY */}
              <div>
                <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* MODEL */}
              <div>
                <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                  Model Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. GFC-56-A"
                  value={form.model}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      model: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  required
                />
              </div>

              {/* PRICE + STOCK */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                    Current Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="12000"
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="25"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stock: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-1 block text-[10px] font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Save size={13} />

                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRICE HISTORY */}
      {showHistory && historyProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <History size={16} className="text-blue-600" />

                  <h2 className="text-sm font-bold text-slate-900">
                    Price History
                  </h2>
                </div>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  {historyProduct.model}
                </p>
              </div>

              <button
                onClick={closeHistory}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-3">
              <div className="space-y-2">
                {[...historyProduct.priceHistory]
                  .reverse()
                  .map((history, index) => {
                    const increase =
                      history.oldPrice !== null &&
                      history.newPrice > history.oldPrice;

                    const decrease =
                      history.oldPrice !== null &&
                      history.newPrice < history.oldPrice;

                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-slate-200 p-2.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                                increase
                                  ? "bg-red-50 text-red-600"
                                  : decrease
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {increase ? (
                                <ArrowUpRight size={14} />
                              ) : decrease ? (
                                <ArrowDownRight size={14} />
                              ) : (
                                <Tag size={14} />
                              )}
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-800">
                                {history.oldPrice === null
                                  ? "Initial Price"
                                  : `Rs. ${formatPrice(
                                      history.oldPrice,
                                    )} → Rs. ${formatPrice(history.newPrice)}`}
                              </p>

                              <p className="mt-0.5 text-[9px] text-slate-400">
                                {history.date} • {history.changedBy}
                              </p>
                            </div>
                          </div>

                          <p className="shrink-0 text-xs font-bold text-slate-800">
                            Rs. {formatPrice(history.newPrice)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>
          <p className="text-[9px] text-slate-500">{title}</p>

          <p className="mt-0.5 text-base font-bold leading-none text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
