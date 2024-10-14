import { FeeQueryParams } from '@/common/constants/formatParams'
import * as feeModal from '@/app/api/(modal)/feeModal'
import { Prisma, Fee } from '@prisma/client'

export const getFeeWithPagination = async (params: FeeQueryParams): Promise<{ rows: Fee[]; count: number }> => {
  const user = await feeModal.getPagination(params)

  return user
}

export const createFee = async (data: Prisma.FeeCreateInput): Promise<Fee> => {
  try {
    const { amount, name } = data

    const count = await feeModal.countFeeByName(name)

    if (count > 0) throw new Error('Iuran sudah ada')

    const Fee = await feeModal.createFee({ amount: amount, name })
    return Fee
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}

export const updateFee = async (id: number, data: Prisma.FeeUpdateInput): Promise<Fee> => {
  try {
    const { amount, name } = data

    const Fee = await feeModal.getFeeById(id)
    const count = await feeModal.countFeeByName(String(name))

    if (!Fee) throw new Error('Iuran tidak ditemukan')
    if (Fee.name !== name && count > 0) throw new Error('Nama iuran sudah ada')

    const newFee = await feeModal.updateFee(id, { amount: Number(amount), name })
    return newFee
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}

export const deleteFee = async (id: number): Promise<Fee> => {
  try {
    const Fee = await feeModal.getFeeById(id)
    if (!Fee) throw new Error('Fee not found')

    await feeModal.deleteFee(id)
    return Fee
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}
