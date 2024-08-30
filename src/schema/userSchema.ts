import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.date().optional(),
  image: z.string().max(200).optional(),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})
