"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Eye,
  TrendingUp,
  Activity,
  LogOut,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH DATA
  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics");
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error(err);
      setError(
        "Could not load analytics. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // CALCULATE TOTALS
  const totalUsers = data.reduce(
    (acc, curr) => acc + parseInt(curr.users || 0),
    0
  );
  const totalViews = data.reduce(
    (acc, curr) => acc + parseInt(curr.views || 0),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-8 font-sans">
      {/* --- HEADER --- */}
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={12} />
            <span>Admin Secure Area</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
            Real-time overview of InoGr Technologies.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={refreshData}
            className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-500 hover:text-primary transition-colors flex-shrink-0"
            title="Refresh Data"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>

          <a
            href="/api/logout"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20 text-sm"
          >
            <LogOut size={18} /> Logout
          </a>
        </div>
      </header>

      {/* --- ERROR STATE --- */}
      {error && (
        <div className="mb-8 p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 text-center animate-in fade-in zoom-in">
          <p className="font-bold">{error}</p>
          <button onClick={refreshData} className="text-sm underline mt-2">
            Try Again
          </button>
        </div>
      )}

      {/* --- STAT CARDS (Grid stacks on mobile) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {loading ? (
          // SKELETON LOADING
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-zinc-900 rounded-3xl animate-pulse"
            />
          ))
        ) : (
          // REAL CARDS
          <>
            <StatCard
              title="Active Users (28d)"
              value={totalUsers.toLocaleString()}
              icon={Users}
              trend="Live Data"
              color="text-blue-500"
              bg="bg-blue-500/10"
            />
            <StatCard
              title="Total Page Views"
              value={totalViews.toLocaleString()}
              icon={Eye}
              trend="Live Data"
              color="text-purple-500"
              bg="bg-purple-500/10"
            />
            <StatCard
              title="System Status"
              value="Healthy"
              icon={Activity}
              trend="Uptime 99.9%"
              color="text-green-500"
              bg="bg-green-500/10"
            />
          </>
        )}
      </div>

      {/* --- MAIN CHART --- */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-4 md:p-8 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Traffic Analysis
          </h3>
          <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
            Last 28 Days
          </span>
        </div>

        <div className="h-[250px] md:h-[350px] w-full">
          {loading ? (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-800/50 rounded-2xl animate-pulse gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />
              <span className="text-gray-400 font-medium text-sm">
                Loading Chart...
              </span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cb050" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4cb050" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                  opacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 10 }}
                  dy={10}
                  minTickGap={30}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                    padding: "8px",
                  }}
                  itemStyle={{ color: "#fff", fontSize: "12px" }}
                  labelStyle={{
                    color: "#a1a1aa",
                    marginBottom: "4px",
                    fontSize: "10px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Visitors"
                  stroke="#4cb050"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENT ---
function StatCard({ title, value, icon: Icon, trend, color, bg }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 md:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-2xl ${bg} ${color}`}>
          <Icon size={20} />
        </div>
        <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">
        {value}
      </h3>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
        {title}
      </p>
    </div>
  );
}
