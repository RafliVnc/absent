import { TuitionQueryParams } from '@/common/constants/formatParams'
import prisma from '@/lib/db/prisma'
import { Prisma, Tuition } from '@prisma/client'

export const getPagination = async (params: TuitionQueryParams): Promise<{ rows: Tuition[]; count: number }> => {
  const where: Prisma.TuitionWhereInput = {}

  const take = params.perPage ? +params.perPage : undefined
  const skip = params.page && take ? (+params.page - 1) * take : undefined
  const count = await prisma.tuition.count({ where })
  const tuition = await prisma.tuition.findMany({
    where,
    skip,
    take,
    orderBy: [{ createdAt: 'desc' }]
  })

  return { rows: tuition, count }
}

export const createTuition = async (data: Prisma.TuitionCreateInput): Promise<Tuition> => {
  return prisma.tuition.create({ data })
}

export const updateTuition = async (id: number, data: Prisma.TuitionUpdateInput): Promise<Tuition> => {
  return prisma.tuition.update({ where: { id }, data })
}

export const getTuitionById = async (id: number): Promise<Tuition | null> => {
  return prisma.tuition.findUnique({ where: { id } })
}

export const countTuitionByName = async (name: string): Promise<number> => {
  return prisma.tuition.count({ where: { name } })
}

export const deleteTuition = async (id: number): Promise<Tuition> => {
  return prisma.tuition.delete({ where: { id } })
}
