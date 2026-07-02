'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Produto } from '@/lib/types'

export default function ListaProdutosAdmin({ produtos }: { produtos: Produto[] }) {
  const router = useRouter()
  const [excluindoId, setExcluindoId] = useState<string | null>(null)

  async function handleExcluir(produto: Produto) {
    if (!confirm(`Excluir "${produto.nome}"? Essa ação não pode ser desfeita.`)) return
    setExcluindoId(produto.id)
    try {
      await fetch(`/api/admin/produtos/${produto.id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setExcluindoId(null)
    }
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center py-16 bg-white/60 rounded-3xl border-2 border-dashed border-white">
        <p className="text-slate-500 mb-4">Nenhum produto cadastrado ainda.</p>
        <Link href="/admin/produtos/novo" className="text-[var(--cor-primaria-escura)] font-semibold">
          + Cadastrar o primeiro produto
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="flex items-center gap-4 bg-white/90 rounded-2xl p-3 border border-white shadow-sm"
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            {produto.imagemUrl ? (
              <Image src={produto.imagemUrl} alt={produto.nome} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">🌙</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 truncate">
              {produto.nome} {produto.destaque && '✨'}
            </p>
            <p className="text-sm text-slate-500">
              {produto.categoria || 'Sem categoria'} · R$ {produto.preco.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href={`/admin/produtos/${produto.id}/editar`}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold"
            >
              Editar
            </Link>
            <button
              onClick={() => handleExcluir(produto)}
              disabled={excluindoId === produto.id}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold disabled:opacity-50"
            >
              {excluindoId === produto.id ? '...' : 'Excluir'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
