'use client'

import React, { useEffect, useState } from 'react'
import { Dialog } from '@radix-ui/react-dialog'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs } from '@radix-ui/react-tabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FormAccount from './FormAccount'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { profileUpdateSchema, updatePasswordSchema } from '@/schema/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { UserRole } from '@prisma/client'
import FormPassword from './FormPassword'

export default function ProfileDialog({
  isOpen,
  setOpen
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { user, update } = useCurrentUser()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('account')

  const formAccount = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: ''
    }
  })

  const formPassword = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    if (user) {
      formAccount.reset({
        name: user.name || ''
      })
    }
  }, [user, formAccount])

  const handleUpdateAccount = async (data: z.infer<typeof profileUpdateSchema>) => {
    const response = await fetch(`/api/user/${user?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      update({ name: data.name })
      toast({ title: 'Profile updated', variant: 'success', duration: 2000 })
      setOpen(false)
    } else {
      const { message } = await response.json()
      toast({ title: message, variant: 'destructive', duration: 2000 })
    }
  }
  const handleUpdatePassword = async (data: z.infer<typeof updatePasswordSchema>) => {
    const response = await fetch(`/api/user/${user?.id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      toast({ title: 'Password updated', variant: 'success', duration: 2000 })
      formPassword.reset()
      setOpen(false)
    } else {
      const { message } = await response.json()
      toast({ title: message, variant: 'destructive', duration: 2000 })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={value => setActiveTab(value)}>
          <TabsList
            className={`grid w-full ${
              user.role === UserRole.COACH || user.role === UserRole.HEADCOACH ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            <TabsTrigger value="account">Account</TabsTrigger>
            {user.role === UserRole.COACH ||
              (user.role === UserRole.HEADCOACH && <TabsTrigger value="password">Password</TabsTrigger>)}
          </TabsList>
          <TabsContent value="account">
            <FormAccount form={formAccount} />
          </TabsContent>
          <TabsContent value="password">
            <FormPassword form={formPassword} />
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button
            type="submit"
            onClick={
              activeTab === 'account'
                ? formAccount.handleSubmit(handleUpdateAccount)
                : formPassword.handleSubmit(handleUpdatePassword)
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
