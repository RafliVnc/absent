'use client'

import { DataTable } from '@/components/ui/DataTable'
import { useTable } from '@/hooks/useTable'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TuitionDummy } from '@/common/constants/dummy'
import { Tuition } from '@/common/type/tuition'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tuitionSchema } from '@/schema/tuitionSchema'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { usePopupAlert } from '@/components/ui/popup-alert'

export default function TableTuition() {
  const [isOpen, setOpen] = useState(false)
  const [isSubmit, setSubmit] = useState(false)
  const [isDisableEdit, setDisableEdit] = useState(false)
  const [currentData, setCurrentData] = useState<Tuition>(TuitionDummy)
  const { toast } = useToast()
  const alert = usePopupAlert()

  const form = useForm<z.infer<typeof tuitionSchema>>({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {
      name: '',
      amount: 0
    }
  })

  const { table, isLoading, reload, data, setData } = useTable('api/tuition', {
    key: 'tuition',
    columns: columns(
      isOpen,
      onCancel,
      handleUpdate,
      currentData,
      form,
      handleSubmit,
      isSubmit,
      handleDelete,
      isDisableEdit
    )
  })

  useEffect(() => {
    setDisableEdit(data?.[0]?.id === 0 || data?.some(item => item.id === currentData?.id))
  }, [data, currentData?.id])

  function onAddNew() {
    setData([TuitionDummy, ...data])
    setOpen(true)
  }

  function onCancel() {
    if (isOpen && data[0].id === 0) data.splice(0, 1)
    setData([...data])
    form.reset(TuitionDummy)
    setCurrentData(TuitionDummy)
    setOpen(false)
  }

  function handleUpdate(data: Tuition) {
    form.reset(data)
    setCurrentData(data)
    setOpen(true)
  }

  async function handleSubmit(data: z.infer<typeof tuitionSchema>) {
    setSubmit(true)
    const isUpdate = !!form.getValues('id')

    const url = isUpdate ? `/api/tuition/${data.id}` : '/api/tuition'

    const response = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      toast({ title: isUpdate ? 'Iuran diperbarui' : 'Iuran dibuat', variant: 'success', duration: 2000 })
      reload()
      setOpen(false)
      setCurrentData(TuitionDummy)
      form.reset(TuitionDummy)
      setSubmit(false)
    } else {
      const { message } = await response.json()
      toast({ title: message, variant: 'destructive', duration: 2000 })
      setSubmit(false)
    }
  }

  async function handleDelete(id: number) {
    alert.setOpen(!alert.isOpen)
    alert.handlePopup({
      onSubmit: async () => {
        const response = await fetch(`/api/tuition/${id}`, { method: 'DELETE' })
        if (response.ok) {
          toast({ title: 'Iuran berhasil dihapus', variant: 'success', duration: 2000 })
          reload()
          alert.setOpen(false)
        } else {
          const { message } = await response.json()
          toast({ title: message, variant: 'destructive', duration: 2000 })
        }
      }
    })
  }

  return (
    <div className="mt-8 space-y-4">
      <Button onClick={() => onAddNew()} disabled={(isOpen || isLoading) && isDisableEdit}>
        Tambah <FontAwesomeIcon icon={faPlus} className="ml-2" />
      </Button>
      <DataTable isLoading={isLoading} table={table} />
    </div>
  )
}
