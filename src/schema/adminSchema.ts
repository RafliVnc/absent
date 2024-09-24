import { z } from 'zod'

export const createAdminSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, { message: 'Please enter your name' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
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
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
