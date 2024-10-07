import { NextRequest, NextResponse } from 'next/server'
import * as adminService from '@/app/api/(service)/adminService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const user = await adminService.updateAdmin(params.id, data)
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
