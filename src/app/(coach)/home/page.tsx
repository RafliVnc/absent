import HomeChart from '@/components/module/home/HomeChart'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function HomePage() {
  return (
    <div className="flex w-full flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <Card className="h-[150px] w-full p-6">
          <p className="font-semibold">Pelatih</p>
          <h4 className="mt-2 text-6xl font-bold">05</h4>
        </Card>
        <Card className="w-full p-6">
          <p className="font-semibold">Atlet</p>
          <h4 className="mt-2 text-6xl font-bold">30</h4>
        </Card>
        <Card className="w-full p-6">
          <p className="font-semibold">Atlet</p>
          <h4 className="mt-2 text-6xl font-bold">50</h4>
        </Card>
        <Card className="w-full p-6">
          <p className="font-semibold">Atlet</p>
          <h4 className="mt-2 text-6xl font-bold">70</h4>
        </Card>
      </div>
      <div className="flex gap-4">
        <Card className="h-[410px] w-3/5 p-6">
          <HomeChart />
        </Card>
        <Card className="w-2/5 p-6">list</Card>
      </div>
    </div>
  )
}
