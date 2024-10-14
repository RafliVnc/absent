import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.date().optional(),
  image: z.string().max(200).optional(),
  role: z.nativeEnum(UserRole).default(UserRole.ATHLETE),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export const profileUpdateSchema = z.object({
  name: z.string().min(1)
})

export const updatePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Please enter your password'
      })
      .min(8, { message: 'Password must be at least 8 characters.' }),
    newPassword: z
      .string({
        required_error: 'Please enter your password'
      })
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z
      .string({
        required_error: 'Please enter your password'
      })
      .min(8, { message: 'Password must be at least 8 characters.' })
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
