'use client';

import { motion } from 'framer-motion';
import { Cloud, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] flex items-center justify-center">
        {/* glow background */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
        >
          <Link href="/">
            <div className="flex flex-col items-center mb-6">
              <Cloud className="w-12 h-12 text-cyan-300 mb-2" />
              <h1 className="text-3xl font-bold text-white">Cloud Based</h1>
              <p className="text-sm text-cyan-200">Secure Cloud File Storage</p>
            </div>
          </Link>
          <div className="space-y-4">
            <input
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <Lock
                className="absolute right-3 top-3 text-white/60"
                size={18}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg"
            >
              Login
            </motion.button>
          </div>

          <p className="text-center text-sm text-white/70 mt-6">
            New here?{' '}
            <Link href="/auth/register">
              <span className="text-cyan-300 cursor-pointer">
                Create account
              </span>
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
