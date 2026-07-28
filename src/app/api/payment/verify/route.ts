import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret key is not configured in backend environment variables." },
        { status: 400 }
      );
    }

    // Verify signature using HMAC SHA256
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(text)
      .digest("hex");

    const isSignatureValid = generatedSignature === razorpay_signature;

    if (isSignatureValid) {
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Signature verification error:", error);
    return NextResponse.json({ error: error.message || "Failed to verify signature" }, { status: 500 });
  }
}
