import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Billing from "./pages/Billing";
import Customers from "./pages/Customers";
import SalesHistory from "./pages/SalesHistory";
import Reports from "./pages/Reports";
import StockManagement from "./pages/StockManagement";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <Products />;

      case "billing":
        return <Billing />;

      case "customers":
        return <Customers />;

      case "sales":
        return <SalesHistory />;

      case "reports":
        return <Reports />;
      case "stock":
        return <StockManagement />;

      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Application */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header activePage={activePage} />

        {/* Page Content */}
        <main className="min-h-0 flex-1 overflow-auto p-4 lg:p-5">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
