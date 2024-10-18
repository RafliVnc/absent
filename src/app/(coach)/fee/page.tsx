import TableFee from '@/components/module/fee/TableFee'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function page() {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Pengelolaan Biaya</h2>
      <Card className="w-full px-8 py-10">
        <Tabs defaultValue="fee">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="fee">Info Biaya</TabsTrigger>
            <TabsTrigger value="athlet">Atlet</TabsTrigger>
            <TabsTrigger value="coach">Pelatih</TabsTrigger>
          </TabsList>
          <TabsContent value="fee">
            <TableFee />
          </TabsContent>
          <TabsContent value="athlet">{/* <TableFee /> */}</TabsContent>
          <TabsContent value="coach">{/* <TableFee /> */}</TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
