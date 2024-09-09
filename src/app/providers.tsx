'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import QueryProviders from '@/lib/store/QueryProviders'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProviders>{children}</QueryProviders>
    </SessionProvider>
  )
}
