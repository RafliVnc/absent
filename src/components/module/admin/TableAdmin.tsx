'use client'

import { DataTable } from '@/components/ui/DataTable'
import { columns } from './columns'
import { useTable } from '@/hooks/useTable'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import FormAdmin from './FormAdmin'
import { useForm } from 'react-hook-form'
import { createAdminSchema } from '@/schema/adminSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'

export default function TableAdmin() {
  const { table, isLoading, reload } = useTable('api/admin', { key: 'admin', columns })
  const [isOpen, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof createAdminSchema>>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmit = async (data: z.infer<typeof createAdminSchema>) => {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      toast({ title: 'Admin created', variant: 'success', duration: 2000 })
      reload()
      setOpen(false)
      form.reset()
    } else {
      const { message } = await response.json()
      toast({ title: message, variant: 'destructive', duration: 2000 })
    }
  }

  return (
    <div className="mx-8 space-y-4 py-10">
      <Button onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <DataTable isLoading={isLoading} table={table} />
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Cretae Admin</DialogTitle>
          </DialogHeader>
          <FormAdmin form={form} handleSubmit={handleSubmit} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
