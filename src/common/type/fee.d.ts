import { FeeType } from '@prisma/client'

export interface Fee {
  id: number
  name: string
  amount: number
  type: FeeType
  createdAt: date
  updatedAt: date
}
