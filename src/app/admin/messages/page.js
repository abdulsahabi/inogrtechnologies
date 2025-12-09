"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  CheckCircle,
  Clock,
  MessageSquare,
  User,
  RefreshCcw,
  X,
  Phone,
  Send,
  Loader2,
} from "lucide-react";
import { getMessages, markAsRead, deleteMessage } from "./actions";
import { sendReplyEmail } from "./replyAction";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image"; // For Avatar

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // <--- NEW: Store Admin Info

  // Reply State
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 1. GET CURRENT ADMIN USER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          name: user.displayName || "Admin",
          email: user.email,
          photo: user.photoURL,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. LOAD MESSAGES
  const loadMessages = async () => {
    setLoading(true);
    const data = await getMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // ACTIONS
  const handleRead = async (msg) => {
    setSelectedMessage(msg);
    setReplyText("");
    if (msg.status === "Unread") {
      setMessages((msgs) =>
        msgs.map((m) => (m.id === msg.id ? { ...m, status: "Read" } : m))
      );
      await markAsRead(msg.id);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Delete this message permanently?")) return;

    setMessages((msgs) => msgs.filter((m) => m.id !== id));
    await deleteMessage(id);
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  // SEND REPLY (UPDATED)
  const handleSendReply = async () => {
    if (!replyText || !currentUser) return;
    setIsSending(true);

    const result = await sendReplyEmail(
      selectedMessage.id,
      selectedMessage.email,
      replyText,
      currentUser // <--- Pass Admin Details
    );

    setIsSending(false);
    if (result.success) {
      alert("Reply Sent!");
      setSelectedMessage(null);
      setReplyText("");
      loadMessages();
    } else {
      alert("Failed: " + result.message);
    }
  };

  const filtered = messages.filter(
    (m) => filter === "All" || m.status === filter
  );
  const unreadCount = messages.filter((m) => m.status === "Unread").length;

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Inbox
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Customer inquiries and support requests.
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 outline-none"
          >
            <option value="All">All Messages</option>
            <option value="Unread">Unread Only</option>
            <option value="Replied">Replied</option>
          </select>
          <button
            onClick={loadMessages}
            className="p-2.5 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm">
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
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <MailOpen size={48} className="mb-4 opacity-20" />
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleRead(msg)}
                className={`group p-4 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-all border-l-4 ${
                  msg.status === "Unread"
                    ? "border-l-primary bg-primary/5"
                    : "border-l-transparent"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    msg.status === "Unread"
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-zinc-800 text-gray-500"
                  }`}
                >
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      className={`text-sm truncate pr-2 ${
                        msg.status === "Unread"
                          ? "font-bold text-gray-900 dark:text-white"
                          : "font-medium text-gray-700 dark:text-zinc-300"
                      }`}
                    >
                      {msg.name}
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {msg.dateDisplay}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 uppercase tracking-wider text-[10px]">
                      {msg.service}
                    </span>
                    <span>{msg.email}</span>

                    {/* SHOW REPLIED BY TAG */}
                    {msg.status === "Replied" && msg.repliedBy && (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold ml-2 border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} /> Replied by{" "}
                        {msg.repliedBy.name}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-1">
                    {msg.message}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(e, msg.id)}
                  className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start p-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedMessage.name}
                  </h2>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="hover:text-primary flex items-center gap-1"
                    >
                      <Mail size={14} /> {selectedMessage.email}
                    </a>
                    {selectedMessage.whatsapp &&
                      selectedMessage.whatsapp !== "Not provided" && (
                        <a
                          href={`https://wa.me/${selectedMessage.whatsapp}`}
                          target="_blank"
                          className="hover:text-green-500 flex items-center gap-1"
                        >
                          <Phone size={14} /> {selectedMessage.whatsapp}
                        </a>
                      )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* If Replied, show previous reply */}
              {selectedMessage.status === "Replied" &&
                selectedMessage.replyText && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-green-700 dark:text-green-400">
                      <CheckCircle size={14} />
                      Replied by {selectedMessage.repliedBy?.name || "Admin"}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "{selectedMessage.replyText}"
                    </p>
                  </div>
                )}

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Reply Box */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block flex items-center gap-2">
                  <Mail size={14} />{" "}
                  {selectedMessage.status === "Replied"
                    ? "Send Another Reply"
                    : "Compose Reply"}
                </label>
                <textarea
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-400"
                  rows={4}
                  placeholder={`Replying as ${currentUser?.name || "Admin"}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={handleSendReply}
                disabled={isSending || !replyText}
                className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Send size={16} />
                )}
                {isSending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
