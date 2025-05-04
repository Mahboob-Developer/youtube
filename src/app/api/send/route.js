import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import SignUp from '../../component/mail/sing-up';
import { render } from '@react-email/render';
import { customAlphabet } from 'nanoid';
import Otp from '../../../model/Otp.js';
import ForgotPassword from '../../component/mail/ForgotPassword';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request) {
  try {
    const { fullname, email, type, id } = await request.json();
    
    // Validate required environment variables
    if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      throw new Error('Missing email configuration');
    }

    if (!id || !email || !type) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const verificationToken = customAlphabet('0123456789', 6)();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    let emailHtml, subject;
    
    if (type === "sign-up") {
      const verificationLink = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/verify-account?token=${verificationToken}`;
      subject = "Verify your account";
      emailHtml = render(
        <SignUp 
          fullname={fullname}
          verificationLink={verificationLink} 
        />
      );
    } else if (type === "forgot-password") {
      const resetLink = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/reset-password?token=${verificationToken}`;
      subject = "Password reset requested";
      emailHtml = render(
        <ForgotPassword
          fullname={fullname}
          resetLink={resetLink}
        />
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid email type' },
        { status: 400 }
      );
    }
    await Otp.findByIdAndDelete({ userId: id });
    const otpRecord = await Otp.create({
      userId: id,
      otp: verificationToken,
      expiresAt
    });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: 'Failed to save OTP' },
        { status: 500 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: email,
      subject,
      html: `${emailHtml}`,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      data 
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        // stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}