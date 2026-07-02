import type { Produto } from './types'

const NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || ''

export function linkWhatsappGenerico(): string {
  const msg = 'Olá! Vi a vitrine do Ateliê da Lua e queria saber mais 🌙'
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`
}

export function linkWhatsappProduto(produto: Produto): string {
  const preco = produto.preco
    ? ` - R$ ${produto.preco.toFixed(2).replace('.', ',')}`
    : ''
  const msg = `Olá! Tenho interesse neste mimo: *${produto.nome}*${preco}\n\nAinda está disponível?`
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`
}
