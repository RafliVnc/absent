import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password'
import { createAdminSchema } from '@/schema/adminSchema'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function FormAdmin({
  form,
  handleSubmit,
  setOpen
}: {
  form: UseFormReturn<z.infer<typeof createAdminSchema>>
  handleSubmit: (_data: z.infer<typeof createAdminSchema>) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} error={!!form.formState.errors.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} error={!!form.formState.errors.email} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!form.getValues('id') && (
          <>
            <PasswordInput
              control={form.control}
              name="password"
              title="Password"
              error={!!form.formState.errors.password}
            />
            <PasswordInput
              control={form.control}
              name="confirmPassword"
              title="Confirm Password"
              error={!!form.formState.errors.confirmPassword}
            />
          </>
        )}
        <div className="flex gap-4">
          <Button
            className="mt-4 w-full"
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button className="mt-4 w-full" type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
