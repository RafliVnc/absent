import { NextRequest, NextResponse } from 'next/server'
import * as feeService from '@/app/api/(service)/feeService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  ;(BigInt.prototype as any).toJSON = function () {
    return Number(this)
  }
  try {
    const data = await req.json()
    const fee = await feeService.updateFee(+params.id, data)

    return NextResponse.json({ data: fee }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  ;(BigInt.prototype as any).toJSON = function () {
    return Number(this)
  }
  try {
    const Fee = await feeService.deleteFee(+params.id)
    return NextResponse.json({ data: Fee }, { status: 201 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 })
    }
  }
}
