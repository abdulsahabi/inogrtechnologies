"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [mode, setMode] = useState("login");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/api/login", {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.ok) {
        router.refresh();
        router.push("/admin");
      } else {
        setErrorMsg("Access Denied. Admin privileges required.");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Invalid credentials. Please try again.");
      setStatus("error");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    setStatus("loading");
    setSuccessMsg("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Reset link sent! Check your inbox.");
      setStatus("success");
    } catch (error) {
      setErrorMsg("Could not find that email.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* 1. LEFT: VISUAL SIDEBAR (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-black p-12 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4cb050_0%,transparent_30%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        {/* Brand */}
        <div className="relative z-10">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-black mb-6">
            <Terminal size={24} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            InoGr <span className="text-primary">Admin</span>
          </h1>
          <p className="text-zinc-400">Enterprise Management Console v2.0</p>
        </div>

        {/* Dynamic Quote / Status */}
        <div className="relative z-10 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md">
          <p className="text-zinc-300 text-lg leading-relaxed mb-4">
            "We are building the digital infrastructure for Northern Nigeria.
            Security, speed, and reliability are our core tenets."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <div>
              <p className="text-sm font-bold text-white">
                Sahabi Abdulrahaman
              </p>
              <p className="text-xs text-zinc-500">Lead Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT: LOGIN FORM */}
      <div className="flex flex-col justify-center items-center p-8 bg-white dark:bg-black">
        <div className="w-full max-w-sm space-y-8">
          {/* Form Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {mode === "login" ? "Welcome back" : "Reset Password"}
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {mode === "login"
                ? "Please enter your details to sign in."
                : "Enter your email to receive instructions."}
            </p>
          </div>

          {/* LOGIN MODE */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@inogr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                  required
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs rounded-lg font-medium border border-red-100 dark:border-red-900/20 flex items-center justify-center">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-xl transition-transform active:scale-95 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-gray-100"
              >
                {status === "loading" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Sign in <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-6">
                <ShieldCheck size={14} /> Secured by Enterprise Auth
              </div>
            </form>
          )}

          {/* RESET MODE */}
          {mode === "reset" && (
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@inogr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  required
                />
              </div>

              {successMsg ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 text-sm rounded-xl font-medium border border-green-100 dark:border-green-900/20 text-center">
                  {successMsg}
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={16} /> Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
