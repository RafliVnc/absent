'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { UserWitoutPassword } from '@/app/api/(modal)/userModal'

export const columns = (handleUpdate: (_data: UserWitoutPassword) => void): ColumnDef<UserWitoutPassword>[] => [
  {
    accessorKey: 'id',
    header: () => <div className="text-center">No</div>,
    cell: ({ row, table }) => {
      return (
        <div className="text-center">
          {table.getState().pagination.pageSize * table.getState().pagination.pageIndex + row.index + 1}
        </div>
      )
    },
    size: 50
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const Admin = row.original

      return (
        <div className="text-start">
          <p className="text-sm">{Admin.name}</p>
          <p className="text-xs text-muted-foreground">{Admin.role}</p>
        </div>
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-start">Created</div>
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const Admin = row.original

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <FontAwesomeIcon icon={faEllipsisVertical} className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(Admin.id))}>
                Copy Admin ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdate(Admin)}>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
