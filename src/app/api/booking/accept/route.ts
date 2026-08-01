import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { bookingId, status } = await request.json(); // status = "ACCEPTED" or "REJECTED"

    if (!bookingId || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const owner = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!owner) return new NextResponse("User not found", { status: 404 });

    // Ensure the booking belongs to a spot owned by this user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { spot: true }
    });

    if (!booking || booking.spot.ownerId !== owner.id) {
      return new NextResponse("Not authorized to modify this booking", { status: 403 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error: any) {
    console.error("Accept booking error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
