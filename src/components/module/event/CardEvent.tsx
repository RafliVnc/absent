import { formatDateTime, formatTime } from '@/common/constants/utils'
import { Card } from '@/components/ui/card'
import { EventType } from '@prisma/client'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import React from 'react'

interface CardEventProps {
  title: string
  type: EventType
  location: string
  date?: string
  startTime?: string
  endTime: string
  //NOTE: startDate and endDate for long event
  startDate?: string
  endDate?: string
  grade?: string
  place?: string
  image?: string
}

export default function CardEvent({
  title,
  type,
  date,
  startTime,
  endTime,
  startDate,
  endDate,
  location,
  grade,
  place,
  image
}: CardEventProps) {
  return (
    <Card className="h-[350px] p-4 hover:cursor-pointer hover:bg-slate-300/5">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={'https://i.pinimg.com/564x/ca/84/85/ca84850b4e714e1c31af973c8aeceedc.jpg'}
          alt=""
          className="mb-2 h-[55%] w-full rounded-lg"
        />
      ) : (
        <div className="mb-2 h-[55%] w-full rounded-lg bg-slate-500" />
      )}
      <div className="mb-3 flex w-full gap-1">
        <div className="flex w-fit items-center justify-center rounded-lg bg-slate-500 px-2 py-1">
          <p className="text-sm text-white">{location}</p>
        </div>
        {grade && type === EventType.TOURMNAMENT && (
          <div className="flex w-fit items-center justify-center rounded-lg bg-slate-500 px-2 py-1">
            <p className="text-sm text-white">{grade}</p>
          </div>
        )}
      </div>
      <h5 className="my-2 text-xl font-semibold">{title}</h5>
      {type === EventType.EXAM ? (
        <>
          <div className="mb-1 flex gap-2">
            <CalendarDays className="size-4" />
            <p className="text-sm">{formatDateTime(date!)}</p>
          </div>
          <div className="flex gap-2">
            <Clock className="size-4" />
            <p className="text-sm">
              {formatTime(`${startTime}`)} - {formatTime(`${endTime}`)} WIB
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-1 flex gap-2">
            <CalendarDays className="size-4" />
            <p className="text-sm">
              {formatDateTime(startDate!)} - {formatDateTime(endDate!)}
            </p>
          </div>
          <div className="mb-1 flex gap-2">
            <MapPin className="size-4" />
            <p className="text-sm">{place}</p>
          </div>
        </>
      )}
    </Card>
  )
}
