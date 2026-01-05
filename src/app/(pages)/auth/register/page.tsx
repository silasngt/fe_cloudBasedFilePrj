'use client';

import { motion } from 'framer-motion';
import { Cloud, User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // mỗi field hiện cách nhau 0.12s
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RegisterPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#1e3a8a] to-[#0ea5e9] relative overflow-hidden">
        {/* glow */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-3xl -bottom-40 -right-40" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <Link href={`/`}>
            <motion.div
              variants={item}
              className="flex flex-col items-center mb-6"
            >
              <Cloud className="w-12 h-12 text-cyan-300 mb-2" />

              <h1 className="text-3xl font-bold text-white">Cloud Based</h1>
              <p className="text-sm text-cyan-200">
                Create your secure cloud account
              </p>
            </motion.div>
          </Link>
          {/* Form */}
          <motion.form variants={container} className="space-y-4">
            <motion.div variants={item} className="relative">
              <User className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            <motion.div variants={item} className="relative">
              <Mail className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            <motion.div variants={item} className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            <motion.div variants={item} className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            <motion.button
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg"
            >
              Create Account
            </motion.button>
          </motion.form>

          <motion.p
            variants={item}
            className="text-center text-sm text-white/70 mt-6"
          >
            Already have an account?{' '}
            <Link href="/auth/login">
              <span className="text-cyan-300 cursor-pointer">Sign in</span>
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
