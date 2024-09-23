import { NextRequest, NextResponse } from 'next/server'
import * as userService from '@/app/api/(service)/userService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const user = await userService.updateUserProfile(params.id, data)
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
  }
}
