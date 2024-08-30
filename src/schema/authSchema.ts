import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string({
      required_error: 'Please enter your password'
    })
    .min(8, { message: 'Password must be at least 8 characters.' })
})
