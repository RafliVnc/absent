import FormLogin from '@/components/module/auth/FormLogin'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[90%] p-6 md:w-[450px]">
        <div className="mb-4 flex flex-col space-y-1">
          <h3 className="text-2xl font-semibold tracking-tight">Login</h3>
          <p className="text-sm text-muted-foreground">Enter your email and password</p>
        </div>
        <FormLogin />
      </Card>
    </main>
  )
}
