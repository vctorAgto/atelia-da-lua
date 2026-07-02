import Image from 'next/image'
import { listarProdutos } from '@/lib/store'
import VitrineClient from '@/components/VitrineClient'
import WhatsappFlutuante from '@/components/WhatsappFlutuante'

export const revalidate = 0

export default async function Home() {
  const produtos = await listarProdutos()

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <header className="flex flex-col items-center text-center gap-3 mb-10">
        <Image src="/logo.png" alt="Ateliê da Lua" width={110} height={110} className="rounded-full" priority />
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Ateliê da Lua</h1>
        <p className="text-slate-500 max-w-md">
          Mimos que encantam ✨ Gostou de algo? É só chamar no WhatsApp — sem cadastro, simples assim!
        </p>
      </header>

      <VitrineClient produtos={produtos} />

      <WhatsappFlutuante />
    </main>
  )
}
