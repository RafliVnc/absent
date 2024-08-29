import bcrypt from 'bcrypt'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'admin',
    email: 'admin@email.com',
    role: 'ADMIN',
    emailVerified: new Date()
  }
]

async function main() {
  console.log(`Start seeding ...`)
  const password = await bcrypt.hash('P@ssw0rd', 10)
  for (const data of userData) {
    const user = await prisma.user.create({
      data: { ...data, password }
    })
    console.log(`Created user with id: ${user.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
