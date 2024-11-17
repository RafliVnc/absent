import { NextRequest, NextResponse } from 'next/server'
import { getParams } from '@/common/constants/utils'
import { CoachService } from '@/app/api/(service)/coachService'
import { globalErrorHandler } from '@/common/errors/handlerErrors'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams.toString())
    const params = getParams(searchParams)

    const user = await CoachService.getCoachWithPagination(params)

    return NextResponse.json({ data: user }, { status: 200 })
  } catch (e) {
    return globalErrorHandler(e)
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const user = await CoachService.createCoach(data)

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (e) {
    return globalErrorHandler(e)
  }
}
