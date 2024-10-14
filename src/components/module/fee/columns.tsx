'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Fee } from '@/common/type/fee'
import { feeSchema } from '@/schema/feeSchema'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import TextField from '@/components/ui/text-field'
import { Loader2, Pencil, Trash } from 'lucide-react'
import { formatToIDR } from '@/common/constants/utils'

export const columns = (
  isOpen: boolean,
  onCancel: () => void,
  handleUpdate: (_data: Fee) => void,
  currentData: Fee,
  form: UseFormReturn<z.infer<typeof feeSchema>>,
  handleSubmit: (_data: z.infer<typeof feeSchema>) => void,
  isSubmit: boolean,
  handleDelete: (_id: number) => void,
  isDisableEdit: boolean
): ColumnDef<Fee>[] => [
  {
    accessorKey: 'no',
    header: () => <div className="text-center">No</div>,
    cell: ({ row, table }) => {
      const Fee = row.original

      return isOpen && Fee.id === 0 ? (
        <p className="text-center">-</p>
      ) : (
        <div className="px-0 text-center">
          {table.getState().pagination.pageSize * table.getState().pagination.pageIndex + row.index + 1}
        </div>
      )
    },
    size: 50
  },
  {
    accessorKey: 'name',
    header: 'Nama Iuran',
    cell: ({ row }) => {
      const Fee = row.original

      return isOpen && (Fee.id === 0 || Fee.id === currentData.id) ? (
        <TextField
          type="text"
          placeholder="Nama"
          defaultValue={form.getValues('name')}
          onChange={e => {
            form.setValue('name', e.target.value)
          }}
          error={!!form.formState.errors.name?.message}
          helperText={form.formState.errors.name?.message}
        />
      ) : (
        <div className="text-start">
          <p className="text-sm">{Fee.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: 'Iuran',
    cell: ({ row }) => {
      const Fee = row.original

      return isOpen && (Fee.id === 0 || Fee.id === currentData.id) ? (
        <TextField
          type="number"
          placeholder="Iuran"
          defaultValue={form.getValues('amount')}
          onChange={e => {
            const regex = /^\d{0,18}$/
            const value = e.target.value

            if (regex.test(value)) {
              form.setValue('amount', +value < 0 ? 0 : Math.round(+value))
            }
          }}
          error={!!form.formState.errors.amount?.message}
          helperText={form.formState.errors.amount?.message}
        />
      ) : (
        <div className="text-start">
          <p className="text-sm">{formatToIDR(Fee.amount)}</p>
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const Fee = row.original

      return isOpen && (Fee.id === 0 || Fee.id === currentData.id) ? (
        <div className="flex justify-center">
          {isSubmit ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <>
              <Button variant="ghost" className="px-2">
                <FontAwesomeIcon size="xl" icon={faCheck} onClick={form.handleSubmit(handleSubmit)} />
              </Button>
              <Button variant="ghost" className="px-2" onClick={onCancel}>
                <FontAwesomeIcon size="xl" icon={faXmark} />
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <Button variant="ghost" className="px-2" disabled={isOpen && isDisableEdit} onClick={() => handleUpdate(Fee)}>
            <Pencil className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="px-2"
            disabled={isOpen && isDisableEdit}
            onClick={() => handleDelete(Fee.id)}
          >
            <Trash className="size-5" />
          </Button>
        </div>
      )
    }
  }
]
