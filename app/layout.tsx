import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ateliê da Lua | Mimos que encantam ✨',
  description: 'Peças artesanais feitas à mão pelo Ateliê da Lua. Escolha seu mimo e chame no WhatsApp!',
  icons: {
    icon: '/favicon-lua.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
