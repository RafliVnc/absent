import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import {
  adminRoutes,
  apiAuthRoutes,
  authRoutes,
  beRoutes,
  DEFAULT_LOGIN_REDIRECT,
  noSiteRoutes,
  publicRoutes,
  superAdminRoutes
} from './routes'
import { UserRole } from '@prisma/client'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req })

  const isApiAuthRoute = pathname.startsWith(apiAuthRoutes)
  const isBeRoute = beRoutes.some(route => pathname.startsWith(route))
  const isPublicRoutes = publicRoutes.includes(pathname)
  const isAuthRoutes = authRoutes.includes(pathname)
  const isAdminRoutes = adminRoutes.includes(pathname)
  const isSuperAdminRoutes = superAdminRoutes.includes(pathname)
  const isNoSiteRoutes = noSiteRoutes.includes(pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isNoSiteRoutes) {
    return Response.redirect(new URL('/login', req.url))
  }

  if (isAuthRoutes) {
    if (token) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
    }
    return
  }

  if (!isPublicRoutes && !token) {
    if (isBeRoute) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    return Response.redirect(new URL('/login', req.url))
  }

  if (token?.user.role === UserRole.ADMIN && isSuperAdminRoutes) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }

  if (token?.user.role === UserRole.USER && isAdminRoutes) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'] }
