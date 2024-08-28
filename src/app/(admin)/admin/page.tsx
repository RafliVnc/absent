import TableAdmin from '@/components/module/admin/TableAdmin'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function page() {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Admin</h2>
      <Card className="w-full">
        <TableAdmin />
      </Card>
    </div>
  )
}
