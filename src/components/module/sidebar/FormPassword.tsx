import { Form } from '@/components/ui/form'
import PasswordInput from '@/components/ui/password'
import { updatePasswordSchema } from '@/schema/userSchema'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function FormPassword({ form }: { form: UseFormReturn<z.infer<typeof updatePasswordSchema>> }) {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <PasswordInput<z.infer<typeof updatePasswordSchema>> control={form.control} name="password" title="Password" />
        <PasswordInput<z.infer<typeof updatePasswordSchema>>
          control={form.control}
          name="newPassword"
          title="New Password"
        />
        <PasswordInput<z.infer<typeof updatePasswordSchema>>
          control={form.control}
          name="confirmPassword"
          title="Confirm Password"
        />
      </div>
    </Form>
  )
}
