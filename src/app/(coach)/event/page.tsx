import CompetitionPage from '@/components/module/event/CompetitionPage'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function EventPage() {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Acara</h2>
      <Card className="w-full px-8 py-10">
        <Tabs defaultValue="competition">
          <TabsList className="mb-8 grid w-[400px] grid-cols-3">
            <TabsTrigger value="competition">Pertandingan</TabsTrigger>
            <TabsTrigger value="ukt">UKT</TabsTrigger>
            <TabsTrigger value="other">Lain-lain</TabsTrigger>
          </TabsList>
          <TabsContent value="competition">
            <CompetitionPage />
          </TabsContent>
          <TabsContent value="ukt">{/* <TableFee /> */}</TabsContent>
          <TabsContent value="other">{/* <TableFee /> */}</TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
