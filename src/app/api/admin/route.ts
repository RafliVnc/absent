import { NextRequest, NextResponse } from 'next/server'
import * as adminService from '@/app/api/(service)/adminService'
import { getParams } from '@/common/constants/utils'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.searchParams.toString())

  const params = getParams(searchParams)

  const user = await adminService.getAdminWithPagination(params)
  return NextResponse.json({ data: user }, { status: 200 })
}