import TableFee from '@/components/module/fee/TableFee'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function page() {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Iuran Bulanan</h2>
      <Card className="w-full px-8 py-10">
        <Tabs defaultValue="feeFee">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="feeFee">Info Iuran</TabsTrigger>
            <TabsTrigger value="payFee">Bayar Iuran</TabsTrigger>
            <TabsTrigger value="payCoach">Iuran Pelatih</TabsTrigger>
          </TabsList>
          <TabsContent value="feeFee">
            <TableFee />
          </TabsContent>
          <TabsContent value="payFee">{/* <TableFee /> */}</TabsContent>
          <TabsContent value="payCoach">{/* <TableFee /> */}</TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
