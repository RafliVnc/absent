import * as userModal from '@/app/api/(modal)/userModal'
import { UserQueryParams } from '@/common/constants/formatParams'
import { Prisma, User, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

export const getAdminWithPagination = async (
  params: UserQueryParams
): Promise<{ rows: userModal.UserWitoutPassword[]; count: number }> => {
  const user = await userModal.getPagination({ ...params, role: UserRole.ADMIN })

  return user
}

export const createAdmin = async (data: Prisma.UserCreateInput): Promise<User> => {
  try {
    const { name, email, password } = data
    const count = await userModal.countUserbyEmail(email!)

    if (count > 0) throw new Error('Email already exists')

    const hashPassword = await bcrypt.hash(password!, 10)

    const createdUser = await userModal.createUser({
      name,
      email,
      password: hashPassword,
      role: UserRole.ADMIN
    })

    return createdUser
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}
