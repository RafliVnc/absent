import { TuitionQueryParams } from '@/common/constants/formatParams'
import * as tuitionModal from '@/app/api/(modal)/tuitionModal'
import { Prisma, Tuition } from '@prisma/client'

export const getTuitionWithPagination = async (
  params: TuitionQueryParams
): Promise<{ rows: Tuition[]; count: number }> => {
  const user = await tuitionModal.getPagination(params)

  return user
}

export const createTuition = async (data: Prisma.TuitionCreateInput): Promise<Tuition> => {
  try {
    const { amount, name } = data

    const count = await tuitionModal.countTuitionByName(name)

    if (count > 0) throw new Error('Iuran sudah ada')

    const Tuition = await tuitionModal.createTuition({ amount: +amount, name })
    return Tuition
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}

export const updateTuition = async (id: number, data: Prisma.TuitionUpdateInput): Promise<Tuition> => {
  try {
    const { amount, name } = data

    const Tuition = await tuitionModal.getTuitionById(id)
    const count = await tuitionModal.countTuitionByName(String(name))

    if (!Tuition) throw new Error('Iuran tidak ditemukan')
    if (Tuition.name !== name && count > 0) throw new Error('Nama iuran sudah ada')

    const newTuition = await tuitionModal.updateTuition(id, { amount: Number(amount), name })
    return newTuition
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}

export const deleteTuition = async (id: number): Promise<Tuition> => {
  try {
    const Tuition = await tuitionModal.getTuitionById(id)
    if (!Tuition) throw new Error('Tuition not found')

    await tuitionModal.deleteTuition(id)
    return Tuition
  } catch (e) {
    if (e instanceof Error) throw e
    else throw new Error(e as string)
  }
}
