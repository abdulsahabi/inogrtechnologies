"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2, Sparkles, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [interests, setInterests] = useState(["tech"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    // Simulate API
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-zinc-900 dark:bg-black">
      {/* OPTIMIZATION: CSS-only Noise (No network request) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-zinc-800/30 dark:bg-zinc-900/30 border border-zinc-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-md">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                <span>Join 2,000+ Subscribers</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Stay ahead of the <br />
                <span className="text-primary">Digital Curve.</span>
              </h2>

              <p className="text-zinc-400 text-lg">
                Get exclusive insights on AI tools, software trends, and student
                resource updates delivered to your inbox.
              </p>

              <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-primary" /> No Spam
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-primary" />{" "}
                  Unsubscribe Anytime
                </span>
              </div>
            </div>

            {/* RIGHT: Smart Form */}
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
              {/* 1. Preference Toggles */}
              <div className="mb-6 space-y-3">
                <p className="text-sm text-zinc-400 font-medium">
                  I{"'"}m interested in:
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => toggleInterest("tech")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border",
                      interests.includes("tech")
                        ? "bg-primary text-white border-primary"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-700"
                    )}
                  >
                    Tech & AI
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInterest("student")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border",
                      interests.includes("student")
                        ? "bg-primary text-white border-primary"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-700"
                    )}
                  >
                    Student Offers
                  </button>
                </div>
              </div>

              {/* 2. The Form / Success State (CSS Animation instead of JS) */}
              <div className="relative min-h-[140px] flex flex-col justify-center">
                {status === "success" ? (
                  <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                      <CheckCircle2 size={24} className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        You{"'"}re on the list!
                      </h3>
                      <p className="text-zinc-400 text-xs mt-1">
                        Watch your inbox for the welcome kit.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-primary text-xs font-bold hover:underline"
                    >
                      Reset Form
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="relative group">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors"
                        size={18}
                      />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-zinc-900/80 border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-zinc-600 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
