import { NextRequest, NextResponse } from 'next/server'
import * as adminService from '@/app/api/(service)/adminService'
import { getParams } from '@/common/constants/utils'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams.toString())
    const params = getParams(searchParams)

    const user = await adminService.getAdminWithPagination(params)

    return NextResponse.json({ data: user }, { status: 200 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const user = await adminService.createAdmin(data)
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
