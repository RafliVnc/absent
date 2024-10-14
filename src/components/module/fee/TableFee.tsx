'use client'

import { DataTable } from '@/components/ui/DataTable'
import { useTable } from '@/hooks/useTable'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FeeDummy } from '@/common/constants/dummy'
import { Fee } from '@/common/type/fee'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { feeSchema } from '@/schema/feeSchema'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { usePopupAlert } from '@/components/ui/popup-alert'

export default function TableFee() {
  const [isOpen, setOpen] = useState(false)
  const [isSubmit, setSubmit] = useState(false)
  const [isDisableEdit, setDisableEdit] = useState(false)
  const [currentData, setCurrentData] = useState<Fee>(FeeDummy)
  const { toast } = useToast()
  const alert = usePopupAlert()

  const form = useForm<z.infer<typeof feeSchema>>({
    resolver: zodResolver(feeSchema),
    defaultValues: {
      name: '',
      amount: 0
    }
  })

  const { table, isLoading, reload, data, setData } = useTable('api/fee', {
    key: 'fee',
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
    setData([FeeDummy, ...data])
    setOpen(true)
  }

  function onCancel() {
    if (isOpen && data[0].id === 0) data.splice(0, 1)
    setData([...data])
    form.reset(FeeDummy)
    setCurrentData(FeeDummy)
    setOpen(false)
  }

  function handleUpdate(data: Fee) {
    form.reset(data)
    setCurrentData(data)
    setOpen(true)
  }

  async function handleSubmit(data: z.infer<typeof feeSchema>) {
    setSubmit(true)
    const isUpdate = !!form.getValues('id')

    const url = isUpdate ? `/api/fee/${data.id}` : '/api/fee'

    const response = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      toast({ title: isUpdate ? 'Iuran diperbarui' : 'Iuran dibuat', variant: 'success', duration: 2000 })
      reload()
      setOpen(false)
      setCurrentData(FeeDummy)
      form.reset(FeeDummy)
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
        const response = await fetch(`/api/fee/${id}`, { method: 'DELETE' })
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
