import Link from 'next/link'
import FormularioProduto from '@/components/FormularioProduto'

export default function NovoProdutoPage() {
  return (
    <div>
      <Link href="/admin" className="inline-block mb-4 text-sm text-slate-500 hover:text-slate-700">
        ← Voltar
      </Link>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Novo produto</h1>
      <FormularioProduto />
    </div>
  )
}
