import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useAuth } from "../../../context/useAuth";
import { login } from "../auth.api";

export function LoginPage() {
  const { login: saveSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fixed the event typing here from React.SubmitEvent to React.FormEvent
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const data = await login({ email, password });
      saveSession(data.accessToken, data.user);

      const from = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  // Framer Motion Variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#121212] p-4 transition-colors duration-300 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-8 sm:p-10 shadow-2xl dark:shadow-[#FFD758]/5 border border-slate-100 dark:border-slate-700 relative"
      >
        {/* Top Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#218DAE] to-[#2BBBD7] dark:from-[#FCE59A] dark:to-[#FFD758]" />

        <motion.div variants={itemVariants} className="mb-8 text-center mt-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Campus<span className="text-[#218DAE] dark:text-[#FFD758]">Nest</span>
          </h1>
          {/* <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Welcome back! Sign in to manage your hostel.
          </p> */}
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder="student@example.com"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#2BBBD7] dark:focus:border-[#FFD758] focus:ring-2 focus:ring-[#2BBBD7]/20 dark:focus:ring-[#FFD758]/20"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3.5 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#2BBBD7] dark:focus:border-[#FFD758] focus:ring-2 focus:ring-[#2BBBD7]/20 dark:focus:ring-[#FFD758]/20"
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-xl bg-[#218DAE] dark:bg-[#FFD758] px-4 py-3.5 text-sm font-semibold text-white dark:text-slate-900 shadow-md transition-colors hover:bg-[#1a708a] dark:hover:bg-[#e6c24f] focus:outline-none focus:ring-2 focus:ring-[#2BBBD7] dark:focus:ring-[#FFD758] focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              Login to Dashboard
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}
