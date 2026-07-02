import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { usuario, senha } = await request.json()

  const usuarioEsperado = process.env.ADMIN_USER
  const hashEsperado = process.env.ADMIN_PASSWORD_HASH

  if (!usuarioEsperado || !hashEsperado) {
    return NextResponse.json(
      { erro: 'Login do admin não configurado. Defina ADMIN_USER e ADMIN_PASSWORD_HASH.' },
      { status: 500 }
    )
  }

  if (usuario !== usuarioEsperado) {
    return NextResponse.json({ erro: 'Usuário ou senha inválidos' }, { status: 401 })
  }

  const senhaValida = await bcrypt.compare(senha ?? '', hashEsperado)
  if (!senhaValida) {
    return NextResponse.json({ erro: 'Usuário ou senha inválidos' }, { status: 401 })
  }

  await createAdminSession()
  return NextResponse.json({ ok: true })
}
