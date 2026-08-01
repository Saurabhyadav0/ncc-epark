import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) return NextResponse.json([]);

    const bookings = await prisma.booking.findMany({
      where: { driverId: user.id },
      include: { spot: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { amount, spotId } = await request.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay environment keys are not configured. Please use mock test checkout option." },
        { status: 400 }
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_spot_${spotId}_${Date.now().toString().slice(-6)}`,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({ id: order.id, amount: order.amount });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create Razorpay order" }, { status: 500 });
  }
}
