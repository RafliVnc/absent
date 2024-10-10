import { UserRole } from '@prisma/client'

export const userDummy = {
  id: '',
  name: '',
  email: '',
  role: UserRole.USER,
  image: ''
}

export const TuitionDummy = {
  id: 0,
  name: '',
  amount: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}
