import { z } from 'zod'

export const tuitionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Kolom ini harus diisi' }),
  amount: z.number().min(1, { message: 'Kolom ini harus diisi' })
})
