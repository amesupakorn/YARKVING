import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.track.deleteMany({})

  const tracks = [
    {
      name: 'สวนลุมพินี (Lumpini Park)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9eAWu_a2sgOpM3Awa9fgkcT4IWFn4IkhD6nuOPXv9a9plyZAnNnO9bwQN7Dn_mjYN3o75Luo1W8UzS9qVmfJv0EMzseHUnRdkd71lezJoJnwzC95gmoZqpRdztdrtnxvqlvZPJ_VB-EMKPUajtBoNKyB3n3SLwB1dvcCQp0vs-R_w2P5qgBvSbB3NAP5jFAlY3GTjyXBhhfrUs11CIOa3bczR8rRCzEzbRvCCmLK-ftibILaoesxOmrs-rmxwvdD6DaN6jgE7EtA',
      rating: 4.8,
      latitude: 13.7303,
      longitude: 100.5414
    },
    {
      name: 'สวนเบญจกิติ (Benjakitti)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKe7E16_qQSgi04J9x3vcvZ1w64qs_4hbdjfnrPdU3XIGxClUSu2tm387ESGFhoKT7mOO1n6byA7ut7R36ZXyQoVgNXfYaBI_xI1A2Nt91y36xh95xEloMV57auN6jcki6FBvBBOQBvL3clDzb3z8fe8U08JL8Asw5SshhryvHGBVVTLxpaRy-eaNpra6LQKrFMEr5mXO7IJUpYK4Fc0xPOZ5yIhIU08Bt41hQh82giuU4HjC80jRJ_2LYcLlGcjnlaLhI2dWxmrg',
      rating: 5.0,
      latitude: 13.7289,
      longitude: 100.5583
    },
    {
      name: 'สวนรถไฟ (Suan Rot Fai)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_60c55mPA7yW7aZxQQkQCsL9R_ivvWT81ukeJg2eFQyfcAdkL3ke__JwY5-C2kgPCW4EmMqW0gReXj3tWiaTEiSBO-aVfHMtRrN1xv9idATMPmcB9aBzStmYuBHjj1TywqBEO6mMNY6GfXmKk4DzUJfenbn_V2CPp67E06_4twvhyPZuXjFrwe4_7oiWJdMi0Qdpd-F9i_0Weilpj5ry7ZRYGn6C6zmxjiZNPttAEyN8wHaH6b8nO64w5avuvuz1sN6CL7EA7kRI',
      rating: 4.2,
      latitude: 13.8166,
      longitude: 100.5540
    },
    {
      name: 'สนามกีฬาแห่งชาติ',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_60c55mPA7yW7aZxQQkQCsL9R_ivvWT81ukeJg2eFQyfcAdkL3ke__JwY5-C2kgPCW4EmMqW0gReXj3tWiaTEiSBO-aVfHMtRrN1xv9idATMPmcB9aBzStmYuBHjj1TywqBEO6mMNY6GfXmKk4DzUJfenbn_V2CPp67E06_4twvhyPZuXjFrwe4_7oiWJdMi0Qdpd-F9i_0Weilpj5ry7ZRYGn6C6zmxjiZNPttAEyN8wHaH6b8nO64w5avuvuz1sN6CL7EA7kRI',
      rating: 4.5,
      latitude: 13.7466,
      longitude: 100.5266
    },
    {
       name: 'สวนจตุจักร (Chatuchak Park)',
       imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6A_b0TzX6xL5H6nN6sOa_J7E_Q7YlGvG3qB4Y_G1K_Q2aW8T7nZcZ2X1D7Lh9vW2Z0lB3v4oGf8YjL_Y6zV9hN9mYwI_J1O1uO_Q3Y0jH4lE9vG_M8Z8D9s2lY9fK3bW8k_U_s3P7W3yH2vF5xR5tE1bX8iL_B2lQ5zM_N3lG8eW9hU7sC2aE9t',
       rating: 4.6,
       latitude: 13.8055,
       longitude: 100.5552
    },
    {
       name: 'อุทยาน 100 ปี จุฬาฯ',
       imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6A_b0TzX6xL5H6nN6sOa_J7E_Q7YlGvG3qB4Y_G1K_Q2aW8T7nZcZ2X1D7Lh9vW2Z0lB3v4oGf8YjL_Y6zV9hN9mYwI_J1O1uO_Q3Y0jH4lE9vG_M8Z8D9s2lY9fK3bW8k_U_s3P7W3yH2vF5xR5tE1bX8iL_B2lQ5zM_N3lG8eW9hU7sC2aE9t',
       rating: 4.7,
       latitude: 13.7383,
       longitude: 100.5255
    }
  ]

  for (const track of tracks) {
    await prisma.track.create({
      data: track
    })
  }

  console.log('Seeded database with tracks!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
