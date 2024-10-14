import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import {
  coachRoutes,
  apiAuthRoutes,
  authRoutes,
  beRoutes,
  DEFAULT_LOGIN_REDIRECT,
  noSiteRoutes,
  publicRoutes,
  headCoachRoutes
} from './routes'
import { UserRole } from '@prisma/client'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req })

  const isApiAuthRoute = pathname.startsWith(apiAuthRoutes)
  const isBeRoute = beRoutes.some(route => pathname.startsWith(route))
  const isPublicRoutes = publicRoutes.includes(pathname)
  const isAuthRoutes = authRoutes.includes(pathname)
  const isCoachRoutes = coachRoutes.includes(pathname)
  const isHeadCoachRoutes = headCoachRoutes.includes(pathname)
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

  if (token?.user.role === UserRole.COACH && isHeadCoachRoutes) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }

  if (token?.user.role === UserRole.ATHLETE && isCoachRoutes) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'] }
