import prisma from '@/lib/db/prisma'
import { User } from '@prisma/client'

import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

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

        const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password!)

        if (!isPasswordCorrect) throw new Error('Email or password incorrect')

        return user
      }
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
  secret: process.env.NEXTAUTH_SECRET as string
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
