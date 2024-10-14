import Navbar from '@/components/module/sidebar/Navbar'
import Sidebar from '@/components/module/sidebar/Sidebar'
import React from 'react'

export interface CoachLayoutProps {
  children: React.ReactNode
}

export default function CoachLayout({ children }: CoachLayoutProps) {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="flex w-full">{children}</main>
      </div>
    </div>
  )
}
