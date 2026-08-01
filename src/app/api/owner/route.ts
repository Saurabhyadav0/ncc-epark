import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const owner = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!owner) return NextResponse.json({ spots: [], bookings: [] });

    const spots = await prisma.parkingSpot.findMany({
      where: { ownerId: owner.id },
      orderBy: { createdAt: 'desc' }
    });

    const bookings = await prisma.booking.findMany({
      where: {
        spot: { ownerId: owner.id },
      },
      include: { spot: true, driver: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ spots, bookings });
  } catch (error) {
    console.error("Owner fetch error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
