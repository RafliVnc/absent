import { z, ZodType } from 'zod'

export const createCoachSchema: ZodType = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter your name' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .union([z.string().min(8, { message: 'Password must be at least 8 characters' }), z.string().length(0)])
      .transform(e => (e === '' ? undefined : e)),
    confirmPassword: z
      .union([z.string().min(8, { message: 'Password must be at least 8 characters' }), z.string().length(0)])
      .transform(e => (e === '' ? undefined : e))
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export const updateCoachSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email address' })
})
