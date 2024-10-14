import * as userModal from '@/app/api/(modal)/userModal'
import { UserQueryParams } from '@/common/constants/formatParams'
import { Prisma, User, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

export const getCoachWithPagination = async (
  params: UserQueryParams
): Promise<{ rows: userModal.UserWitoutPassword[]; count: number }> => {
  const user = await userModal.getPagination({ ...params, role: UserRole.COACH })

  return user
}

export const createCoach = async (data: Prisma.UserCreateInput): Promise<User> => {
  try {
    const { name, email, password } = data
    const count = await userModal.countUserbyEmail(email!)

    if (count > 0) throw new Error('Email already exists')

    const hashPassword = await bcrypt.hash(password!, 10)

    const createdUser = await userModal.createUser({
      name,
      email,
      password: hashPassword,
      role: UserRole.COACH
    })

    return createdUser
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}

export const updateCoach = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
  try {
    const user = await userModal.getUserById(id)
    if (!user) throw new Error('User not found')

    const count = await userModal.countUserbyEmail(user.email!)

    if (count > 0 && user.email !== data.email) throw new Error('Email already exists')

    const newUser = await userModal.updateUser(id, {
      name: data.name,
      email: data.email
    })

    return newUser
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}
