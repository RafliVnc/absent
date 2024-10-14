import { UserRole } from '@prisma/client'

export const userDummy = {
  id: '',
  name: '',
  email: '',
  role: UserRole.ATHLETE,
  image: ''
}

export const FeeDummy = {
  id: 0,
  name: '',
  amount: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}
