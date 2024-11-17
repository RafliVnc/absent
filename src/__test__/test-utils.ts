import prisma from '@/lib/db/prisma'

export class CoachTestUtils {
  static async create({ id }: { id?: string }) {
    await prisma.user.create({
      data: {
        id: id,
        name: 'Coach Test',
        email: 'test@example.com',
        role: 'COACH'
      }
    })
  }

  static async delete() {
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } })
  }
}
