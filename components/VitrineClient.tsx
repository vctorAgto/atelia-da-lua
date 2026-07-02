'use client'

import { useMemo, useState } from 'react'
import type { Produto } from '@/lib/types'
import ProdutoCard from './ProdutoCard'

export default function VitrineClient({ produtos }: { produtos: Produto[] }) {
  const [categoria, setCategoria] = useState<string>('Todos')
  const [busca, setBusca] = useState('')

  const categorias = useMemo(() => {
    const unicas = new Set(produtos.map((p) => p.categoria).filter(Boolean))
    return ['Todos', ...Array.from(unicas)]
  }, [produtos])

  const produtosFiltrados = produtos.filter((p) => {
    const passaCategoria = categoria === 'Todos' || p.categoria === categoria
    const passaBusca = p.nome.toLowerCase().includes(busca.toLowerCase())
    return passaCategoria && passaBusca
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="O que você procura hoje? ♡"
          className="flex-1 h-12 px-5 rounded-2xl border-2 border-white bg-white/80 outline-none focus:border-[var(--cor-primaria)] transition"
        />
      </div>

      {categorias.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                categoria === cat
                  ? 'bg-[var(--cor-primaria-escura)] text-white'
                  : 'bg-white/70 text-slate-600 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {produtosFiltrados.length === 0 ? (
        <div className="text-center py-20 bg-white/60 rounded-[28px] border-2 border-dashed border-white">
          <div className="text-5xl mb-4">🌙</div>
          <p className="text-slate-500 font-medium">
            {produtos.length === 0
              ? 'Em breve novidades por aqui...'
              : 'Nenhum mimo encontrado com esse filtro.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  )
}
