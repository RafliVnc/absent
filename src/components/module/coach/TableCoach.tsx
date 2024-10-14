'use client'

import { DataTable } from '@/components/ui/DataTable'
import { columns } from './columns'
import { useTable } from '@/hooks/useTable'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import FormCoach from './FormCoach'
import { useForm } from 'react-hook-form'
import { createCoachSchema } from '@/schema/coachSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { UserWitoutPassword } from '@/app/api/(modal)/userModal'

export default function TableCoach() {
  const [isOpen, setOpen] = useState(false)
  const { toast } = useToast()
  const { table, isLoading, reload } = useTable('api/coach', { key: 'coach', columns: columns(handleUpdate) })

  const form = useForm<z.infer<typeof createCoachSchema>>({
    resolver: zodResolver(createCoachSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  function handleUpdate(data: UserWitoutPassword) {
    form.reset({
      id: data.id,
      name: data.name || '',
      email: data.email || ''
    })
    setOpen(true)
  }

  const handleSubmit = async (data: z.infer<typeof createCoachSchema>) => {
    const isUpdate = !!form.getValues('id')

    if (!isUpdate) {
      const validation = await form.trigger(['password', 'confirmPassword'])
      if (!validation) return
    }

    const url = isUpdate ? `/api/coach/${data.id}` : '/api/coach'

    const response = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isUpdate ? { id: data.id, name: data.name, email: data.email } : data)
    })

    if (response.ok) {
      toast({ title: isUpdate ? 'Coach updated' : 'Coach created', variant: 'success', duration: 2000 })
      reload()
      setOpen(false)
      form.reset()
    } else {
      const { message } = await response.json()
      toast({ title: message, variant: 'destructive', duration: 2000 })
    }
  }

  const handleClose = () => {
    setOpen(false)
    form.reset({
      id: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }
  return (
    <div className="mx-8 space-y-4 py-10">
      <Button onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <DataTable isLoading={isLoading} table={table} />
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{!!form.getValues('id') ? 'Update Coach' : 'Create Coach'}</DialogTitle>
          </DialogHeader>
          <FormCoach form={form} handleSubmit={handleSubmit} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
