import {
  Bell,
  Search,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

function Header({ activePage }) {
  const titles = {
    dashboard: "Dashboard",
    products: "Products & Models",
    billing: "Billing",
    customers: "Customers",
    sales: "Sales History",
    reports: "Reports",
  };

  return (
    <header className="flex h-[58px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">

      {/* Left */}
      <div className="min-w-0">

        <h2 className="truncate text-[15px] font-semibold leading-tight tracking-tight text-slate-900">
          {titles[activePage] || "GFC ERP"}
        </h2>

        <p className="mt-0.5 text-[9px] leading-tight text-slate-400">
          Manage your business efficiently
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">

        {/* Search */}
        <button
          title="Search"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <Search size={15} />
        </button>

        {/* Date */}
        <button
          className="hidden h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 md:flex"
        >
          <CalendarDays size={14} />
          <span>Today</span>
        </button>

        {/* Notification */}
        <button
          title="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <Bell size={15} />

          <span className="absolute right-[6px] top-[5px] h-1.5 w-1.5 rounded-full border border-white bg-red-500" />
        </button>

        {/* Profile */}
        <button className="ml-1.5 flex items-center gap-2 border-l border-slate-200 pl-2.5">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-[11px] font-semibold text-white">
            A
          </div>

          <div className="hidden text-left lg:block">

            <p className="text-[10px] font-semibold leading-tight text-slate-800">
              Administrator
            </p>

            <p className="mt-0.5 text-[8px] leading-tight text-slate-400">
              Admin Account
            </p>

          </div>

          <ChevronDown
            size={13}
            className="hidden text-slate-400 lg:block"
          />

        </button>

      </div>
    </header>
  );
}

export default Header;