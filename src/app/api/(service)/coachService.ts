import * as userModal from '@/app/api/(modal)/userModal'
import { UserQueryParams } from '@/common/constants/formatParams'
import { DuplicateError } from '@/common/errors/duplicateError'
import { NotFoundError } from '@/common/errors/notFoundError'
import { CoachValidationSchema } from '@/schema/api/coachValidation'
import { Prisma, User, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

export class CoachService {
  static async getCoachWithPagination(
    params: UserQueryParams
  ): Promise<{ rows: userModal.UserWitoutPassword[]; count: number }> {
    const user = await userModal.getPagination({ ...params, role: UserRole.COACH })

    return user
  }

  static async createCoach(data: Prisma.UserCreateInput): Promise<User> {
    data = CoachValidationSchema.CREATE.parse(data)
    const { name, email, password } = data

    const count = await userModal.countUserbyEmail(email!)
    if (count != 0) {
      throw new DuplicateError('Email sudah digunakan')
    }

    const hashPassword = await bcrypt.hash(password!, 10)

    const createdUser = await userModal.createUser({
      name,
      email,
      password: hashPassword,
      role: UserRole.COACH
    })

    return createdUser
  }

  static async updateCoach(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await userModal.getUserById(id)

    if (!user) {
      throw new NotFoundError('Pelatih tidak ditemukan')
    }

    const count = await userModal.countUserbyEmail(user.email!)

    if (count != 0 && user.email !== data.email) {
      throw new DuplicateError('Email sudah digunakan')
    }

    const newUser = await userModal.updateUser(id, {
      name: data.name,
      email: data.email
    })

    return newUser
  }
}
