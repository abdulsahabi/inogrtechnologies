"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Building2,
  Coffee,
  MessageSquare,
  User,
  Globe,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { submitContactForm } from "./actions"; // <--- IMPORT ACTION

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("tech");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
    message: "",
  });

  // --- CONNECTED SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Call Server Action
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus("success");
      // Reset Form
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        service: "",
        message: "",
      });
    } else {
      alert(result.message || "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <section className="pt-10 pb-10 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-5xl mx-auto text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight"
          >
            Let's Start a <span className="text-primary">Conversation.</span>
          </motion.h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl md:mx-0 mx-auto">
            Whether you need a complex enterprise platform or just need to print
            a document, we are here to help.
          </p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          {/* LEFT: Contact Info */}
          <div className="space-y-10">
            {/* WHATSAPP CARD */}
            <a
              href="https://wa.me/2349071455425?text=Hello%20InoGr,%20I%20would%20like%20to%20inquire%20about..."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all cursor-pointer"
            >
              <div className="h-14 w-14 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 text-white shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
                <MessageCircle size={32} fill="white" className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-[#25D366] transition-colors">
                  Chat on WhatsApp
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Fastest response. Click to start chat.
                </p>
              </div>
            </a>

            {/* Standard Contacts */}
            <div className="space-y-8">
              <ContactItem
                icon={Mail}
                label="Email Us"
                value="inogrworks@gmail.com"
                link="mailto:inogrworks@gmail.com"
              />
              <ContactItem
                icon={Phone}
                label="Call Us"
                value="+234 907 145 5425"
                link="tel:+2349071455425"
              />
              <ContactItem
                icon={MapPin}
                label="Visit HQ"
                value="Students' Area, Take-off site, Federal University Birnin Kebbi, Kebbi State."
                link="#"
              />
            </div>

            {/* Live Status Box */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                  Support Online
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our team is active. Expect a response within an hour.
              </p>
            </div>
          </div>

          {/* RIGHT: Smart Form */}
          <div className="relative">
            {/* Department Switcher */}
            <div className="flex p-1 mb-8 rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
              <button
                onClick={() => setActiveTab("tech")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all",
                  activeTab === "tech"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <Building2 size={16} /> Enterprise Tech
              </button>
              <button
                onClick={() => setActiveTab("cafe")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all",
                  activeTab === "cafe"
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <Coffee size={16} /> Café Services
              </button>
            </div>

            {/* FORM AREA */}
            <div className="bg-white dark:bg-black md:p-0">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center border border-green-500/20 bg-green-500/5 rounded-2xl"
                  >
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-6">
                      Thanks for reaching out. We'll get back to you shortly via
                      WhatsApp or Email.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Your Name
                      </label>
                      <div className="relative group">
                        <User
                          className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors"
                          size={18}
                        />
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Email Address
                        </label>
                        <div className="relative group">
                          <Mail
                            className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors"
                            size={18}
                          />
                          <input
                            required
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      {/* WhatsApp Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex justify-between">
                          WhatsApp Number{" "}
                          <span className="text-gray-400 font-medium normal-case">
                            (Optional)
                          </span>
                        </label>
                        <div className="relative group">
                          <MessageCircle
                            className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#25D366] transition-colors"
                            size={18}
                          />
                          <input
                            type="tel"
                            placeholder="+234..."
                            value={formData.whatsapp}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                whatsapp: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 focus:border-[#25D366] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {activeTab === "tech"
                          ? "Service Needed"
                          : "Café Inquiry"}
                      </label>
                      <div className="relative group">
                        <Globe
                          className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors"
                          size={18}
                        />
                        <select
                          className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                        >
                          <option value="">Select a topic...</option>
                          {activeTab === "tech" ? (
                            <>
                              <option value="web">Web Development</option>
                              <option value="mobile">Mobile App</option>
                              <option value="ai">AI Solution</option>
                            </>
                          ) : (
                            <>
                              <option value="print">Printing Services</option>
                              <option value="cac">CAC Registration</option>
                              <option value="pos">POS / Data</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Message
                      </label>
                      <div className="relative group">
                        <MessageSquare
                          className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors"
                          size={18}
                        />
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:scale-100"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={20} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Helper Component
function ContactItem({ icon: Icon, label, value, link }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center shrink-0 text-primary">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
          {label}
        </h3>
        <a
          href={link}
          className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors leading-relaxed block mt-1"
        >
          {value}
        </a>
      </div>
    </div>
  );
}
