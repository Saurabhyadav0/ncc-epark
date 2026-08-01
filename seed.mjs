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
        id: "spot-1",
        ownerId: owner.id,
        title: "Sec-14 Main Market Plaza",
        description: "Adjacent to Central Park. 24/7 CCTV surveillance, gate entry.",
        price: 40,
        latitude: 28.4089,
        longitude: 77.3178,
      },
      {
        id: "spot-2",
        ownerId: owner.id,
        title: "Metro Station Parking Slot 4B",
        description: "Fast access to metro ticketing gates. Fully covered basement.",
        price: 30,
        latitude: 28.4110,
        longitude: 77.3210,
      },
      {
        id: "spot-3",
        ownerId: owner.id,
        title: "P2P Residential Driveway",
        description: "Monetized residential slot. Hosted by Manish. Safe, quiet street.",
        price: 25,
        latitude: 28.4055,
        longitude: 77.3140,
      },
      {
        id: "spot-4",
        ownerId: owner.id,
        title: "Crown Plaza Mall Outdoor Lot",
        description: "Open-air plaza park. Electric charging ports available on spot.",
        price: 50,
        latitude: 28.4125,
        longitude: 77.3120,
      }
    ];

    for (const spot of mockSpots) {
      await prisma.parkingSpot.upsert({
        where: { id: spot.id },
        update: spot,
        create: spot,
      });
    }
    console.log("Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
