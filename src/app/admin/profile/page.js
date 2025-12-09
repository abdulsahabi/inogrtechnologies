"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { updateProfile } from "./actions";
import {
  User,
  Lock,
  Save,
  Loader2,
  ShieldCheck,
  Mail,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load Current User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || "",
          photo: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function handleUpdate(formData) {
    if (!user) return;
    setSaving(true);

    const result = await updateProfile(user.uid, formData);
    setSaving(false);

    if (result.success) {
      alert(
        "Profile Updated! (If you changed your password, please log in again)"
      );
    } else {
      alert("Error: " + result.message);
    }
  }

  // --- LOADING SKELETON ---
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-[400px] w-full bg-gray-200 dark:bg-zinc-800 rounded-3xl" />
      </div>
    );
  }

  // --- NO USER STATE ---
  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Session Expired
        </h2>
        <a
          href="/login"
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold"
        >
          Login Again
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm">
          Manage your personal details and credentials.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-800">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white dark:border-zinc-800">
              {user.name?.[0]?.toUpperCase() || <User size={32} />}
            </div>
            <div className="absolute bottom-0 right-0 bg-zinc-900 text-white p-2 rounded-full border-2 border-white dark:border-zinc-800 cursor-pointer hover:bg-primary transition-colors">
              <Camera size={14} />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 dark:text-zinc-400 mt-1">
              <ShieldCheck size={14} className="text-primary" />
              <span>Super Administrator</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form action={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input
              disabled
              value={user.email || ""}
              className="w-full bg-gray-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-500 dark:text-zinc-500 cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400">
              Managed by Enterprise Identity Provider.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Display Name
            </label>
            <input
              name="name"
              defaultValue={user.name}
              placeholder="Your Name"
              className="w-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>

          <div className="pt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} /> Change Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter new password (optional)"
                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
