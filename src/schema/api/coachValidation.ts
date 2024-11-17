import { z, ZodType } from 'zod'

export class CoachValidationSchema {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1, { message: 'Please enter your name' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' })
  })
}
