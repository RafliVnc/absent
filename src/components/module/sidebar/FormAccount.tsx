'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { profileUpdateSchema } from '@/schema/userSchema'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function FormAccount({ form }: { form: UseFormReturn<z.infer<typeof profileUpdateSchema>> }) {
  const { user } = useCurrentUser()
  return (
    <form>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="username">Email</Label>
          <Input disabled id="username" defaultValue={user.email ?? ''} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={form.getValues('name')} {...form.register('name')} />
        </div>
      </div>
    </form>
  )
}
