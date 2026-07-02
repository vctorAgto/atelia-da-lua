export type Produto = {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  imagemUrl: string | null
  destaque: boolean
  criadoEm: string
}

export type NovoProduto = Omit<Produto, 'id' | 'criadoEm'>
