import { UserQueryParams } from '@/common/constants/formatParams'
import prisma from '@/lib/db/prisma'
import { Prisma, User } from '@prisma/client'

export type UserWitoutPassword = Omit<User, 'password' | 'updatedAt'>

export const getPagination = async (
  params: UserQueryParams
): Promise<{ rows: UserWitoutPassword[]; count: number }> => {
  const where: Prisma.UserWhereInput = {}

  if (params.role) where.role = params.role

  const take = params.perPage ? +params.perPage : undefined
  const skip = params.page && take ? (+params.page - 1) * take : undefined
  const count = await prisma.user.count({ where })
  const user: UserWitoutPassword[] = await prisma.user.findMany({
    where,
    skip,
    take,
    orderBy: [{ createdAt: 'desc' }, { email: 'asc' }],
    select: {
      name: true,
      id: true,
      email: true,
      role: true,
      emailVerified: true,
      image: true,
      createdAt: true
    }
  })

  return { rows: user, count }
}

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } })
}

export const updateUser = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
  return prisma.user.update({ where: { id }, data })
}

export const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data })
}

export const countUserbyEmail = async (email: string): Promise<number> => {
  return prisma.user.count({ where: { email } })
}
