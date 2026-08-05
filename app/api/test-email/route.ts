import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function GET() {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: "UAMC Admin Test Email",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>🎉 Email Configuration Successful</h2>
          <p>Your Gmail SMTP is working correctly.</p>
          <p>You can now use it for:</p>

          <ul>
            <li>Forgot Password</li>
            <li>OTP Verification</li>
            <li>Order Confirmation</li>
            <li>Notifications</li>
          </ul>

          <hr/>

          <p><b>UAMC Admin Panel</b></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
      },
      {
        status: 500,
      }
    );
  }
}