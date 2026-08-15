import {
  LayoutDashboard,
  Package,
  ReceiptText,
  Users,
  History,
  BarChart3,
  Settings,
  Boxes,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    page: "dashboard",
  },
  {
    name: "Products",
    icon: Package,
    page: "products",
  },
  {
    name: "Stock Management",
    icon: Boxes,
    page: "stock",
  },
  {
    name: "Billing",
    icon: ReceiptText,
    page: "billing",
  },
  {
    name: "Customers",
    icon: Users,
    page: "customers",
  },
  {
    name: "Sales History",
    icon: History,
    page: "sales",
  },
  {
    name: "Reports",
    icon: BarChart3,
    page: "reports",
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r border-slate-800/80 bg-[#0b1220] text-white">
      {/* Logo */}
      <div className="flex h-[58px] shrink-0 items-center border-b border-slate-800/80 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-600/20">
            <Boxes size={17} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-[15px] font-bold leading-tight tracking-tight">
              GFC <span className="text-blue-400">ERP</span>
            </h1>

            <p className="mt-0.5 text-[7px] uppercase leading-tight tracking-[0.16em] text-slate-500">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-2.5 pt-4">
        <p className="mb-2 px-2.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium transition-all duration-150 ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-300" />
                )}

                <Icon
                  size={15}
                  strokeWidth={active ? 2.3 : 2}
                  className={
                    active
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-200"
                  }
                />

                <span>{item.name}</span>

                {active && (
                  <ChevronRight size={12} className="ml-auto text-blue-200" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="mt-auto p-2.5">
        {/* Settings */}
        <button className="mb-2 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium text-slate-400 transition hover:bg-slate-800/70 hover:text-white">
          <Settings size={15} />

          <span>Settings</span>
        </button>

        {/* Administrator */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400">
              <Users size={14} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold text-white">
                Administrator
              </p>

              <p className="mt-0.5 truncate text-[8px] text-slate-500">
                System Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
