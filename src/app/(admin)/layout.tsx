import Sidebar from '@/components/module/sidebar/Sidebar'
import React from 'react'

export interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex w-full items-center justify-center">{children}</main>
    </div>
  )
}
