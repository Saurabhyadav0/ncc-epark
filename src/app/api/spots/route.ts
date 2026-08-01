import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const spots = await prisma.parkingSpot.findMany({
      where: {
        status: "AVAILABLE",
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(spots);
  } catch (error) {
    console.error("Fetch spots error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description, address, phone, price, latitude, longitude, hasEv } = await request.json();

    if (!title || !price || !latitude || !longitude || !address || !phone) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Ensure owner exists
    const owner = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: { clerkId: userId, name: "Owner" }
    });

    const spot = await prisma.parkingSpot.create({
      data: {
        title,
        description,
        address,
        phone,
        price: Number(price),
        latitude: Number(latitude),
        longitude: Number(longitude),
        hasEv: Boolean(hasEv),
        ownerId: owner.id,
      }
    });

    return NextResponse.json({ success: true, spot });
  } catch (error: any) {
    console.error("Create spot error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
