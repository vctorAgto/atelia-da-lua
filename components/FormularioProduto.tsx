'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Produto } from '@/lib/types'

export default function FormularioProduto({ produto }: { produto?: Produto }) {
  const router = useRouter()
  const [nome, setNome] = useState(produto?.nome ?? '')
  const [descricao, setDescricao] = useState(produto?.descricao ?? '')
  const [preco, setPreco] = useState(produto?.preco?.toString() ?? '')
  const [categoria, setCategoria] = useState(produto?.categoria ?? '')
  const [destaque, setDestaque] = useState(produto?.destaque ?? false)
  const [imagem, setImagem] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(produto?.imagemUrl ?? null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  function handleImagemChange(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0] ?? null
    setImagem(arquivo)
    if (arquivo) setPreview(URL.createObjectURL(arquivo))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setEnviando(true)

    const formData = new FormData()
    formData.set('nome', nome)
    formData.set('descricao', descricao)
    formData.set('preco', preco || '0')
    formData.set('categoria', categoria)
    formData.set('destaque', String(destaque))
    if (imagem) formData.set('imagem', imagem)

    try {
      const url = produto ? `/api/admin/produtos/${produto.id}` : '/api/admin/produtos'
      const res = await fetch(url, { method: produto ? 'PUT' : 'POST', body: formData })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setErro(data.erro || 'Erro ao salvar produto')
      }
    } catch {
      setErro('Erro de conexão')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
          Foto do produto
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
            {preview ? (
              <Image src={preview} alt="Prévia" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">🌙</div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImagemChange} className="text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
          Nome *
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-white outline-none focus:border-[var(--cor-primaria)]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
          Descrição
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-white outline-none focus:border-[var(--cor-primaria)]"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
            Preço (R$)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-white outline-none focus:border-[var(--cor-primaria)]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
            Categoria
          </label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Crochê, Bijuteria..."
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-white outline-none focus:border-[var(--cor-primaria)]"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} />
        Marcar como destaque ✨
      </label>

      {erro && <p className="text-rose-600 text-sm font-semibold">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="h-12 rounded-xl bg-slate-800 text-white font-bold disabled:opacity-60"
      >
        {enviando ? 'Salvando...' : produto ? 'Salvar alterações' : 'Cadastrar produto'}
      </button>
    </form>
  )
}
