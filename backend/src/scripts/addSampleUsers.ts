import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'sample1@hyderabad.bits-pilani.ac.in',
      name: 'Sample User 1',
      pfpUrl: 'https://example.com/avatar1.png',
    },
    {
      email: 'sample2@hyderabad.bits-pilani.ac.in',
      name: 'Sample User 2',
      pfpUrl: 'https://example.com/avatar2.png',
    },
    {
      email: 'sample3@hyderabad.bits-pilani.ac.in',
      name: 'Sample User 3',
      pfpUrl: 'https://example.com/avatar3.png',
    }
  ];

  const result = await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  });

  console.log(`${result.count} users inserted!`);
}

main()
  .catch((err) => {
    console.error('Error inserting users:', err);
  })
  .finally(() => prisma.$disconnect());
