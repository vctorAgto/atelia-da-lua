import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buscarProduto } from '@/lib/store'
import FormularioProduto from '@/components/FormularioProduto'

export const revalidate = 0

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const produto = await buscarProduto(id)
  if (!produto) notFound()

  return (
    <div>
      <Link href="/admin" className="inline-block mb-4 text-sm text-slate-500 hover:text-slate-700">
        ← Voltar
      </Link>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Editar produto</h1>
      <FormularioProduto produto={produto} />
    </div>
  )
}
