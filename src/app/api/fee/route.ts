import { getParams } from '@/common/constants/utils'
import { NextRequest, NextResponse } from 'next/server'
import * as feeService from '@/app/api/(service)/feeService'

export async function GET(req: NextRequest) {
  ;(BigInt.prototype as any).toJSON = function () {
    return Number(this)
  }
  try {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams.toString())
    const params = getParams(searchParams)

    const Fee = await feeService.getFeeWithPagination(params)

    return NextResponse.json({ data: Fee }, { status: 200 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}

export async function POST(req: NextRequest) {
  ;(BigInt.prototype as any).toJSON = function () {
    return Number(this)
  }
  try {
    const data = await req.json()
    const Fee = await feeService.createFee(data)

    return NextResponse.json({ data: Fee }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
