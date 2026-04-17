import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.track.updateMany({
    data: {
      imageUrl: 'image/default-track.png'
    }
  })
  console.log(`Updated ${result.count} tracks in dev.db to use "image/default-track.png"`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
