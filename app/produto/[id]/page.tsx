import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buscarProduto } from '@/lib/store'
import { linkWhatsappProduto } from '@/lib/whatsapp'
import { WhatsappIcon } from '@/components/ProdutoCard'
import WhatsappFlutuante from '@/components/WhatsappFlutuante'

export const revalidate = 0

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const produto = await buscarProduto(id)
  if (!produto) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/" className="inline-block mb-6 text-slate-500 hover:text-slate-700 text-sm font-medium">
        ← Voltar para a vitrine
      </Link>

      <div className="bg-white/90 rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-white">
        <div className="relative aspect-square bg-slate-100">
          {produto.imagemUrl ? (
            <Image src={produto.imagemUrl} alt={produto.nome} fill className="object-cover" priority />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">🌙</div>
          )}
        </div>
        <div className="p-6 flex flex-col gap-4">
          {produto.categoria && (
            <span className="text-xs font-semibold text-[var(--cor-primaria-escura)] uppercase tracking-wide">
              {produto.categoria}
            </span>
          )}
          <h1 className="text-2xl font-bold text-slate-800">{produto.nome}</h1>
          {produto.descricao && (
            <p className="text-slate-600 whitespace-pre-line">{produto.descricao}</p>
          )}
          {produto.preco > 0 && (
            <span className="text-2xl font-bold text-slate-800">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
          )}
          <a
            href={linkWhatsappProduto(produto)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-95 text-white font-semibold rounded-2xl py-3.5 transition"
          >
            <WhatsappIcon />
            Pedir no WhatsApp
          </a>
        </div>
      </div>

      <WhatsappFlutuante />
    </main>
  )
}
