import { Card } from '@/components/ui/card'
import { CalendarDays, Clock } from 'lucide-react'
import React from 'react'

export default function CardEvent() {
  return (
    <Card className="h-[350px] p-4 hover:cursor-pointer hover:bg-primary/5">
      <div className="mb-2 h-[55%] w-full rounded-lg bg-slate-500" />
      <div className="mb-3 flex w-full gap-1">
        <div className="flex w-fit items-center justify-center rounded-lg bg-slate-500 px-2 py-1">
          <p className="text-sm text-white">Jakarta Timur</p>
        </div>
        <div className="flex w-fit items-center justify-center rounded-lg bg-slate-500 px-2 py-1">
          <p className="text-sm text-white">Grade - 1</p>
        </div>
      </div>
      <h5 className="my-2 text-xl font-semibold">Title</h5>
      <div className="mb-1 flex gap-2">
        <CalendarDays className="size-4" />
        <p className="text-sm">1 Jan 2022 - 10 Jan 2022</p>
      </div>
      <div className="flex gap-2">
        <Clock className="size-4" />
        <p className="text-sm">10:00 - 12:00 WIB</p>
      </div>
    </Card>
  )
}
