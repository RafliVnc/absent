import { NextRequest, NextResponse } from 'next/server'
import { CoachService } from '@/app/api/(service)/coachService'
import { globalErrorHandler } from '@/common/errors/handlerErrors'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const user = await CoachService.updateCoach(params.id, data)

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (e) {
    return globalErrorHandler(e)
  }
}
