import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="bg-white/80 border-b border-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-slate-800">
            🌙 Ateliê da Lua · Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-slate-500 hover:text-slate-700">
              Ver vitrine ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  )
}
