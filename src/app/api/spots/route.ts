import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const spots = await prisma.parkingSpot.findMany({
      where: { status: "AVAILABLE" }
    });
    return NextResponse.json(spots);
  } catch (error) {
    console.error("Fetch spots error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
