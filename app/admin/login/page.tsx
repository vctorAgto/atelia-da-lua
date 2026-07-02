'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setErro(data.erro || 'Erro ao entrar')
      }
    } catch {
      setErro('Erro de conexão')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#FAF9FA] rounded-[35px] shadow-xl p-10 w-full max-w-sm text-center border border-white">
        <Image src="/logo.png" alt="Ateliê da Lua" width={100} height={100} className="mx-auto mb-6 rounded-full" />
        <h1 className="text-lg font-bold text-slate-800 mb-6">Painel do Ateliê</h1>
        <form onSubmit={handleSubmit} className="text-left flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-2">
              Usuário
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-white outline-none focus:border-[var(--cor-primaria)] transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 bg-white outline-none focus:border-[var(--cor-primaria)] transition"
            />
          </div>
          {erro && <p className="text-rose-600 text-sm font-semibold text-center">{erro}</p>}
          <button
            type="submit"
            disabled={carregando}
            className="h-14 rounded-2xl bg-slate-800 text-white font-bold mt-2 disabled:opacity-60"
          >
            {carregando ? 'Entrando...' : 'Acessar'}
          </button>
        </form>
      </div>
    </main>
  )
}
