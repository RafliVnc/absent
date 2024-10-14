import { NextRequest, NextResponse } from 'next/server'
import * as coachService from '@/app/api/(service)/coachService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const user = await coachService.updateCoach(params.id, data)
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
