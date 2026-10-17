"use client";
import { useState } from "react";
import { Send, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-sky-600 to-cyan-500 dark:from-sky-300 dark:to-cyan-300 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Have a question or feedback? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Info side */}
        <div className="md:col-span-2 space-y-4">
          {[
            { icon: Mail, label: "Email", value: "hello@skycast.app" },
            { icon: Phone, label: "Phone", value: "+880 1234 567 890" },
            { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-linear-to-br from-sky-500 to-cyan-400 text-white">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="font-medium text-gray-800 dark:text-gray-100">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form side */}
        <div className="md:col-span-3">
          <div className="glass rounded-3xl p-6 sm:p-8 shadow-xl">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                  <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Message Sent!</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Thanks for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-sm font-medium transition"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 resize-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}