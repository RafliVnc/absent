import { NextRequest, NextResponse } from 'next/server'
import * as tuitionService from '@/app/api/(service)/tuitionService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const tuition = await tuitionService.updateTuition(+params.id, data)

    return NextResponse.json({ data: tuition }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const Tuition = await tuitionService.deleteTuition(+params.id)
    return NextResponse.json({ data: Tuition }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
