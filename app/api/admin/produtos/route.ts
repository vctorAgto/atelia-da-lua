import { NextRequest, NextResponse } from 'next/server'
import { criarProduto, salvarImagem } from '@/lib/store'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const nome = String(formData.get('nome') ?? '').trim()
  const descricao = String(formData.get('descricao') ?? '').trim()
  const preco = Number(formData.get('preco') ?? 0)
  const categoria = String(formData.get('categoria') ?? '').trim()
  const destaque = formData.get('destaque') === 'true'
  const imagem = formData.get('imagem') as File | null

  if (!nome) {
    return NextResponse.json({ erro: 'Nome é obrigatório' }, { status: 400 })
  }

  let imagemUrl: string | null = null
  if (imagem && imagem.size > 0) {
    imagemUrl = await salvarImagem(imagem)
  }

  const produto = await criarProduto({
    nome,
    descricao,
    preco: Number.isFinite(preco) ? preco : 0,
    categoria,
    destaque,
    imagemUrl,
  })

  return NextResponse.json(produto, { status: 201 })
}
