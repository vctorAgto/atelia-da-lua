import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifyAdminToken } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isLoginPage = pathname === '/admin/login'
  const isLoginApi = pathname === '/api/admin/login'
  if (isLoginPage || isLoginApi) return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  const autenticado = token ? await verifyAdminToken(token) : false

  if (!autenticado) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ erro: 'Não autenticado' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
