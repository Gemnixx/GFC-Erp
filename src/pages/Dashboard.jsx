import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Today's Sales",
    value: "Rs. 0",
    change: "No sales yet",
    icon: TrendingUp,
  },
  {
    title: "Total Orders",
    value: "0",
    change: "Today's orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "0",
    change: "Total customers",
    icon: Users,
  },
  {
    title: "Products",
    value: "0",
    change: "Active products",
    icon: Package,
  },
];

function Dashboard() {
  return (
    <div className="h-full min-h-0 overflow-hidden space-y-4">

      {/* Welcome Header */}
      <div className="shrink-0">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Welcome back, Aftab Alam
        </h1>

        <p className="mt-0.5 text-[11px] text-slate-500">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid shrink-0 grid-cols-2 gap-3 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div className="min-w-0">

                  <p className="text-[10px] font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-1 text-lg font-bold leading-none text-slate-900">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-[9px] text-slate-400">
                    {stat.change}
                  </p>

                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={16} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Main Dashboard Cards */}
      <div className="grid min-h-0 grid-cols-1 gap-3 xl:grid-cols-3">

        {/* Sales Overview */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white xl:col-span-2">

          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">

            <div>
              <h3 className="text-xs font-semibold text-slate-900">
                Sales Overview
              </h3>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Your sales performance will appear here
              </p>
            </div>

            <button className="flex items-center gap-1 text-[10px] font-medium text-blue-600 transition hover:text-blue-700">
              View Report
              <ArrowUpRight size={12} />
            </button>

          </div>

          <div className="flex h-[190px] items-center justify-center">

            <div className="text-center">

              <TrendingUp
                size={28}
                className="mx-auto text-slate-300"
              />

              <p className="mt-2 text-xs font-medium text-slate-500">
                No sales data available
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Start billing to see your sales analytics.
              </p>

            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white">

          <div className="border-b border-slate-100 px-4 py-3">

            <h3 className="text-xs font-semibold text-slate-900">
              Recent Activity
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Latest business activity
            </p>

          </div>

          <div className="flex h-[190px] items-center justify-center px-4">

            <div className="text-center">

              <Package
                size={27}
                className="mx-auto text-slate-300"
              />

              <p className="mt-2 text-xs font-medium text-slate-500">
                No recent activity
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Your latest transactions will appear here.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;