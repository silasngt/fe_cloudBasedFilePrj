'use client';
import Link from 'next/link';
import { Cloud, Folder, User, Settings, Trash2, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const menus = [
  { label: 'Quản lý file', href: '/dashboard', icon: Folder },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
  { label: 'Cài đặt', href: '/dashboard/settings', icon: Settings },
  { label: 'Thùng rác', href: '/dashboard/trash', icon: Trash2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const route = useRouter();

  const handleLogout = (linkRedirect: string) => {
    const refreshToken = cookieStore.get('refresh_token');

    if (!refreshToken) {
      console.error('Không tìm thấy refresh token');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          cookieStore.delete('access_token');
          cookieStore.delete('refresh_token');
          route.push(linkRedirect);
        }
      });
  };

  return (
    <>
      <aside className="w-64 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 p-6 text-white flex flex-col">
        {/* LOGO */}
        <Link href={`/`}>
          <div className="flex items-center gap-2 text-xl font-bold mb-8">
            <Cloud className="text-cyan-300" />
            Cloud Based
          </div>
        </Link>

        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-black">
            T
          </div>
          <div className="flex-1">
            <p className="font-semibold leading-tight">Thành Tài</p>
            <p className="text-xs text-white/60">user@email.com</p>
          </div>
          <button
            onClick={() => handleLogout('/auth/login')}
            className="hover:text-red-400"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* MENU */}
        <nav className="space-y-2 flex-1">
          {menus.map((m) => {
            const Icon = m.icon;
            const active = pathname === m.href;

            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? 'bg-cyan-400 text-black font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                {m.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
