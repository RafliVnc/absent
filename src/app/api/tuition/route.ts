import { getParams } from '@/common/constants/utils'
import { NextRequest, NextResponse } from 'next/server'
import * as tuitionService from '@/app/api/(service)/tuitionService'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams.toString())
    const params = getParams(searchParams)

    const Tuition = await tuitionService.getTuitionWithPagination(params)

    return NextResponse.json({ data: Tuition }, { status: 200 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const Tuition = await tuitionService.createTuition(data)

    return NextResponse.json({ data: Tuition }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
