'use client'

import { DataTable } from '@/components/ui/DataTable'
import { columns } from './columns'
import { useTable } from '@/hooks/useTable'

export default function TableAdmin() {
  const { table, isLoading } = useTable('api/admin', { key: 'admin', columns })

  return (
    <div className="mx-8 py-10">
      <DataTable isLoading={isLoading} table={table} />
    </div>
  )
}
