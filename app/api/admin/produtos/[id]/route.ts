import { NextRequest, NextResponse } from 'next/server'
import { atualizarProduto, buscarProduto, excluirProduto, removerImagem, salvarImagem } from '@/lib/store'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const produtoExistente = await buscarProduto(id)
  if (!produtoExistente) {
    return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 })
  }

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

  let imagemUrl = produtoExistente.imagemUrl
  if (imagem && imagem.size > 0) {
    if (produtoExistente.imagemUrl) await removerImagem(produtoExistente.imagemUrl)
    imagemUrl = await salvarImagem(imagem)
  }

  const produto = await atualizarProduto(id, {
    nome,
    descricao,
    preco: Number.isFinite(preco) ? preco : 0,
    categoria,
    destaque,
    imagemUrl,
  })

  return NextResponse.json(produto)
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const removido = await excluirProduto(id)
  if (!removido) {
    return NextResponse.json({ erro: 'Produto não encontrado' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
