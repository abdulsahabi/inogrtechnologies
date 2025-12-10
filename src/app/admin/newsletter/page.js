"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Mail,
  Download,
  RefreshCcw,
  Users,
  TrendingUp,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { getSubscribers, deleteSubscriber } from "./actions";

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // LOAD DATA
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getSubscribers();
    setSubscribers(data);
    setLoading(false);
  }

  // DELETE HANDLER
  const handleDelete = async (id) => {
    if (!confirm("Remove this subscriber? They will stop receiving emails."))
      return;
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    await deleteSubscriber(id);
  };

  // EXPORT CSV HANDLER
  const handleExport = () => {
    const header = ["Email,Interests,Date Joined,Status\n"];
    const rows = subscribers.map(
      (s) =>
        `${s.email},"${s.interests?.join("|")}",${s.dateDisplay},${s.status}`
    );

    const csvContent =
      "data:text/csv;charset=utf-8," + header.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inogr_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FILTER LOGIC
  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Audience
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
            Manage your newsletter subscribers.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={loadData}
            className="p-3 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            title="Refresh"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={handleExport}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold transition-all shadow-lg active:scale-95 hover:opacity-90"
          >
            <Download size={20} /> Export CSV
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Subscribers"
          value={subscribers.length}
          icon={Users}
          color="text-blue-500"
          bg="bg-blue-500/10"
        />
        <StatCard
          title="Tech Interest"
          value={
            subscribers.filter((s) => s.interests?.includes("tech")).length
          }
          icon={TrendingUp}
          color="text-purple-500"
          bg="bg-purple-500/10"
        />
        <StatCard
          title="Student Interest"
          value={
            subscribers.filter((s) => s.interests?.includes("student")).length
          }
          icon={CheckCircle2}
          color="text-green-500"
          bg="bg-green-500/10"
        />
      </div>

      {/* LIST SECTION */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search email addresses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-sm"
          />
        </div>

        {/* Data List */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 dark:bg-zinc-800 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Mail size={24} className="text-gray-400 dark:text-zinc-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                No subscribers yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                Share your newsletter to grow your audience.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-zinc-950/50 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800 hidden md:table-header-group">
                <tr>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                    Email
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                    Interests
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                    Date Joined
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group flex flex-col md:table-row"
                  >
                    {/* Email Cell */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-bold uppercase shrink-0">
                        {sub.email[0]}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {sub.email}
                      </span>
                    </td>

                    {/* Interests Cell */}
                    <td className="px-6 py-2 md:py-4">
                      <div className="flex flex-wrap gap-2">
                        {sub.interests?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Date Cell */}
                    <td className="px-6 py-2 md:py-4 text-gray-500 dark:text-zinc-400 text-xs md:text-sm">
                      {sub.dateDisplay}
                    </td>

                    {/* Actions Cell */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        title="Unsubscribe User"
                      >
                        <Trash2 size={16} />
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
  );
}

function StatCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none">
          {value}
        </h3>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mt-1">
          {title}
        </p>
      </div>
    </div>
  );
}
