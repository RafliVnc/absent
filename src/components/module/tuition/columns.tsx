'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Tuition } from '@/common/type/tuition'
import { tuitionSchema } from '@/schema/tuitionSchema'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import TextField from '@/components/ui/text-field'
import { Loader2 } from 'lucide-react'

export const columns = (
  isOpen: boolean,
  onCancel: () => void,
  handleUpdate: (_data: Tuition) => void,
  currentData: Tuition,
  form: UseFormReturn<z.infer<typeof tuitionSchema>>,
  handleSubmit: (_data: z.infer<typeof tuitionSchema>) => void,
  isSubmit: boolean,
  handleDelete: (_id: number) => void,
  isDisableEdit: boolean
): ColumnDef<Tuition>[] => [
  {
    accessorKey: 'no',
    header: () => <div className="text-center">No</div>,
    cell: ({ row, table }) => {
      const Tuition = row.original

      return isOpen && Tuition.id === 0 ? (
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
      const Tuition = row.original

      return isOpen && (Tuition.id === 0 || Tuition.id === currentData.id) ? (
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
          <p className="text-sm">{Tuition.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: 'Iuran',
    cell: ({ row }) => {
      const Tuition = row.original

      return isOpen && (Tuition.id === 0 || Tuition.id === currentData.id) ? (
        <TextField
          type="number"
          placeholder="Iuran"
          defaultValue={form.getValues('amount')}
          onChange={e => {
            form.setValue('amount', +e.target.value < 0 ? 0 : Math.round(+e.target.value))
          }}
          error={!!form.formState.errors.amount?.message}
          helperText={form.formState.errors.amount?.message}
        />
      ) : (
        <div className="text-start">
          <p className="text-sm">IDR {Tuition.amount}</p>
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const Tuition = row.original

      return isOpen && (Tuition.id === 0 || Tuition.id === currentData.id) ? (
        <div className="flex justify-center">
          {isSubmit ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          <Button
            variant="ghost"
            className="px-2"
            disabled={isOpen && isDisableEdit}
            onClick={() => handleUpdate(Tuition)}
          >
            <FontAwesomeIcon size="lg" icon={faPen} />
          </Button>
          <Button
            variant="ghost"
            className="px-2"
            disabled={isOpen && isDisableEdit}
            onClick={() => handleDelete(Tuition.id)}
          >
            <FontAwesomeIcon size="lg" icon={faTrash} />
          </Button>
        </div>
      )
    }
  }
]
