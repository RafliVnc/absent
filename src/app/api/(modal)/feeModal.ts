import { FeeQueryParams } from '@/common/constants/formatParams'
import prisma from '@/lib/db/prisma'
import { Prisma, Fee } from '@prisma/client'

export const getPagination = async (params: FeeQueryParams): Promise<{ rows: Fee[]; count: number }> => {
  const where: Prisma.FeeWhereInput = {}

  const take = params.perPage ? +params.perPage : undefined
  const skip = params.page && take ? (+params.page - 1) * take : undefined
  const count = await prisma.fee.count({ where })
  const fee = await prisma.fee.findMany({
    where,
    skip,
    take,
    orderBy: [{ createdAt: 'desc' }]
  })

  return { rows: fee, count }
}

export const createFee = async (data: Prisma.FeeCreateInput): Promise<Fee> => {
  return prisma.fee.create({ data })
}

export const updateFee = async (id: number, data: Prisma.FeeUpdateInput): Promise<Fee> => {
  return prisma.fee.update({ where: { id }, data })
}

export const getFeeById = async (id: number): Promise<Fee | null> => {
  return prisma.fee.findUnique({ where: { id } })
}

export const countFeeByName = async (name: string): Promise<number> => {
  return prisma.fee.count({ where: { name } })
}

export const deleteFee = async (id: number): Promise<Fee> => {
  return prisma.fee.delete({ where: { id } })
}
