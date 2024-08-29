'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password'
import { Separator } from '@/components/ui/separator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { loginSchema } from '@/schema/authSchema'

export default function FormLogin() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await signIn('credentials', {
      redirect: false,
      username: values.email,
      password: values.password
    })
    if (!result?.ok) {
      toast({
        title: `${result?.error}`,
        variant: 'destructive',
        duration: 2000
      })
      return
    }
    toast({
      title: 'Welcome back!',
      variant: 'success',
      duration: 2000
    })
    router.push('/home')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordInput control={form.control} name="password" title="Password" />
        <div>
          <Button className="mt-4 w-full" type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <Button className="w-full" type="button" variant="outline">
            <FontAwesomeIcon icon={faGithub} className="mr-4 size-5" /> Github
          </Button>
          <Button className="w-full" type="button" variant="outline">
            <FontAwesomeIcon icon={faGoogle} className="mr-4 size-5" /> Google
          </Button>
        </div>
      </form>
    </Form>
  )
}
