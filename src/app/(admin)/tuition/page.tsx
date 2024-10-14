import TableTuition from '@/components/module/tuition/TableTuition'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function page() {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Iuran Bulanan</h2>
      <Card className="w-full px-8 py-10">
        <Tabs defaultValue="tuitionFee">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="tuitionFee">Info Iuran</TabsTrigger>
            <TabsTrigger value="payTuition">Bayar Iuran</TabsTrigger>
            <TabsTrigger value="payCoach">Iuran Pelatih</TabsTrigger>
          </TabsList>
          <TabsContent value="tuitionFee">
            <TableTuition />
          </TabsContent>
          <TabsContent value="payTuition">{/* <TableTuition /> */}</TabsContent>
          <TabsContent value="payCoach">{/* <TableTuition /> */}</TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
