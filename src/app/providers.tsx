'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import QueryProviders from '@/lib/store/QueryProviders'
import { PopupAlertProvider } from '@/components/ui/popup-alert'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PopupAlertProvider>
        <QueryProviders>{children}</QueryProviders>
      </PopupAlertProvider>
    </SessionProvider>
  )
}
