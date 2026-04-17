import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.track.updateMany({
    data: {
      imageUrl: '/images/default-track.png'
    }
  })
  console.log(`Updated ${result.count} tracks in dev.db`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
