import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { connectToDB } from "@/lib/connectToDB";
import User from "@/lib/models/User";
import { sendEmail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email.",
        },
        {
          status: 404,
        }
      );
    }

    // Generate Random Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash Token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save to Database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
      <div style="font-family:Arial;padding:30px">

        <h2>Password Reset Request</h2>

        <p>Hello ${user.name},</p>

        <p>We received a request to reset your password.</p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            margin-top:20px;
            background:#2563eb;
            color:#fff;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:20px;">
          This link will expire in <b>15 minutes</b>.
        </p>

        <p>
          If you didn't request this, you can safely ignore this email.
        </p>

        <hr>

        <small>
          UAMC Admin Panel
        </small>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}