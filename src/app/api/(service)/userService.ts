import * as userModal from '@/app/api/(modal)/userModal'
import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'

export const updateUserProfile = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
  const { name } = data
  const user = await userModal.updateUser(id, { name })

  return user
}
export const updateUserPassword = async (
  id: string,
  data: { password: string; newPassword: string }
): Promise<User> => {
  const user = await userModal.getUserById(id)

  if (!user) throw new Error('User not found')
  if (!user.password) throw new Error('Account already linked use another Email')
  try {
    const { password, newPassword } = data

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) throw new Error('Incorrect password')

    const hashPassword = await bcrypt.hash(newPassword, 10)

    const userUpdate = await userModal.updateUser(id, { password: hashPassword })

    return userUpdate
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}
