import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const owner = await prisma.user.upsert({
      where: { clerkId: "mock_owner_123" },
      update: {},
      create: { clerkId: "mock_owner_123", name: "Mock Owner" }
    });

    const mockSpots = [
      {
        title: "Model Town Driveway",
        description: "Spacious residential driveway in Model Town. Very safe.",
        price: 30,
        status: "AVAILABLE",
        latitude: 28.8900,
        longitude: 76.5900,
        ownerId: owner.id
      },
      {
        title: "Medical More Parking Lot",
        description: "Commercial lot near Medical More. 24/7 security.",
        price: 45,
        status: "AVAILABLE",
        latitude: 28.8850,
        longitude: 76.5850,
        ownerId: owner.id
      },
      {
        title: "D-Park Open Space",
        description: "Open plot near D-Park. Good for large vehicles.",
        price: 25,
        status: "AVAILABLE",
        latitude: 28.8980,
        longitude: 76.5800,
        ownerId: owner.id
      },
      {
        title: "Sector 14 House Garage",
        description: "Covered parking in Sector 14. Locked overnight.",
        price: 40,
        status: "OCCUPIED",
        latitude: 28.8920,
        longitude: 76.5950,
        ownerId: owner.id
      },
    ];

    await prisma.parkingSpot.deleteMany({});

    for (const spot of mockSpots) {
      await prisma.parkingSpot.create({
        data: spot,
      });
    }
    console.log("Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
