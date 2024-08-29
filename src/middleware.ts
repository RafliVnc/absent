import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { apiAuthRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT, noSiteRoutes, publicRoutes } from './routes'

export async function middleware(req: any) {
  const { pathname } = req.nextUrl
  const isLoggedin = await getToken({ req })

  const isApiAuthRoute = pathname.startsWith(apiAuthRoutes)
  const isPublicRoutes = publicRoutes.includes(pathname)
  const isAuthRoutes = authRoutes.includes(pathname)
  const isNoSiteRoutes = noSiteRoutes.includes(pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isNoSiteRoutes) {
    return Response.redirect(new URL('/login', req.url))
  }

  if (isAuthRoutes) {
    if (isLoggedin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url))
    }
    return
  }

  if (!isPublicRoutes && !isLoggedin) {
    return Response.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'] }
