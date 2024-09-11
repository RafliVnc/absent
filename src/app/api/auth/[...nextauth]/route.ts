import prisma from '@/lib/db/prisma'
import { User } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.username }
        })
        if (!user) throw new Error('Email or password incorrect')
        if (!credentials?.password) throw new Error('Please provide your password')

        if (!user.password) throw new Error('Account already linked use another Email')

        const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password!)

        if (!isPasswordCorrect) throw new Error('Email or password incorrect')

        return user
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User
      return token
    },

    async session({ session, token }) {
      session.user = token.user
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma)
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
