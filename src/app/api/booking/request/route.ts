import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { spotId, hours, amount, licensePlate } = await request.json();

    if (!spotId || !hours || !amount || !licensePlate) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Ensure the driver exists in our database
    const driver = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: { clerkId: userId, name: "Driver" }
    });

    // Create the booking request (status defaults to PENDING)
    const booking = await prisma.booking.create({
      data: {
        spotId,
        driverId: driver.id,
        hours,
        amount,
        licensePlate,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error("Booking request error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
