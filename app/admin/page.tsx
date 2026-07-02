import Link from 'next/link'
import { listarProdutos } from '@/lib/store'
import ListaProdutosAdmin from '@/components/ListaProdutosAdmin'

export const revalidate = 0

export default async function AdminDashboard() {
  const produtos = await listarProdutos()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Produtos ({produtos.length})</h1>
          <p className="text-sm text-slate-500">Gerencie o catálogo exibido na vitrine</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="px-5 py-3 rounded-2xl bg-slate-800 text-white font-semibold text-sm"
        >
          + Novo produto
        </Link>
      </div>

      <ListaProdutosAdmin produtos={produtos} />
    </div>
  )
}
