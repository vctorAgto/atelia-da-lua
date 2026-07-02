import { put, del, list } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'
import type { NovoProduto, Produto } from './types'

const PRODUTOS_BLOB_PATH = 'data/produtos.json'
const usarBlob = !!process.env.BLOB_READ_WRITE_TOKEN

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'produtos.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

async function lerProdutosLocal(): Promise<Produto[]> {
  try {
    const conteudo = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(conteudo)
  } catch {
    return []
  }
}

async function salvarProdutosLocal(produtos: Produto[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), 'utf-8')
}

async function lerProdutosBlob(): Promise<Produto[]> {
  const { blobs } = await list({ prefix: PRODUTOS_BLOB_PATH })
  const encontrado = blobs.find((b) => b.pathname === PRODUTOS_BLOB_PATH)
  if (!encontrado) return []
  const res = await fetch(encontrado.url, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function salvarProdutosBlob(produtos: Produto[]): Promise<void> {
  await put(PRODUTOS_BLOB_PATH, JSON.stringify(produtos, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

export async function listarProdutos(): Promise<Produto[]> {
  const produtos = usarBlob ? await lerProdutosBlob() : await lerProdutosLocal()
  return produtos.sort((a, b) => (a.criadoEm < b.criadoEm ? 1 : -1))
}

export async function buscarProduto(id: string): Promise<Produto | null> {
  const produtos = await listarProdutos()
  return produtos.find((p) => p.id === id) ?? null
}

export async function criarProduto(dados: NovoProduto): Promise<Produto> {
  const produtos = usarBlob ? await lerProdutosBlob() : await lerProdutosLocal()
  const produto: Produto = {
    ...dados,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  }
  produtos.push(produto)
  if (usarBlob) await salvarProdutosBlob(produtos)
  else await salvarProdutosLocal(produtos)
  return produto
}

export async function atualizarProduto(
  id: string,
  dados: Partial<NovoProduto>
): Promise<Produto | null> {
  const produtos = usarBlob ? await lerProdutosBlob() : await lerProdutosLocal()
  const index = produtos.findIndex((p) => p.id === id)
  if (index === -1) return null
  produtos[index] = { ...produtos[index], ...dados }
  if (usarBlob) await salvarProdutosBlob(produtos)
  else await salvarProdutosLocal(produtos)
  return produtos[index]
}

export async function excluirProduto(id: string): Promise<boolean> {
  const produtos = usarBlob ? await lerProdutosBlob() : await lerProdutosLocal()
  const produto = produtos.find((p) => p.id === id)
  if (!produto) return false
  const restantes = produtos.filter((p) => p.id !== id)
  if (usarBlob) await salvarProdutosBlob(restantes)
  else await salvarProdutosLocal(restantes)
  if (produto.imagemUrl) await removerImagem(produto.imagemUrl)
  return true
}

export async function salvarImagem(arquivo: File): Promise<string> {
  const extensao = arquivo.name.split('.').pop() || 'jpg'
  const nomeArquivo = `${crypto.randomUUID()}.${extensao}`

  if (usarBlob) {
    const { url } = await put(`produtos/${nomeArquivo}`, arquivo, {
      access: 'public',
      addRandomSuffix: false,
    })
    return url
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true })
  const buffer = Buffer.from(await arquivo.arrayBuffer())
  await fs.writeFile(path.join(UPLOADS_DIR, nomeArquivo), buffer)
  return `/uploads/${nomeArquivo}`
}

export async function removerImagem(urlOuCaminho: string): Promise<void> {
  try {
    if (usarBlob && urlOuCaminho.startsWith('http')) {
      await del(urlOuCaminho)
    } else if (!usarBlob && urlOuCaminho.startsWith('/uploads/')) {
      await fs.unlink(path.join(process.cwd(), 'public', urlOuCaminho))
    }
  } catch {
    // se o arquivo já não existir, ignora
  }
}
