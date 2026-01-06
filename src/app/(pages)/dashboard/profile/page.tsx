import { Mail, User, Calendar } from 'lucide-react';

export default function ProfilePage() {
  return (
    <>
      <div className="max-w-4xl space-y-8 text-white">
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold text-black">
              T
            </div>
            <button className="text-sm text-cyan-300 hover:underline">
              Change avatar
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/60 flex items-center gap-2">
                <User size={16} /> Full name
              </p>
              <p className="font-semibold text-lg">Nguyễn Giang Thành Tài</p>
            </div>

            <div>
              <p className="text-sm text-white/60 flex items-center gap-2">
                <Mail size={16} /> Email
              </p>
              <p className="font-semibold text-lg">example@gmail.com</p>
            </div>

            <div>
              <p className="text-sm text-white/60 flex items-center gap-2">
                <Calendar size={16} /> Joined at
              </p>
              <p className="font-semibold text-lg">01/01/2026</p>
            </div>

            <div>
              <p className="text-sm text-white/60">Storage used</p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div className="bg-cyan-400 h-2 rounded-full w-1/3" />
              </div>
              <p className="text-xs text-white/60 mt-1">3.2 GB / 10 GB</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
