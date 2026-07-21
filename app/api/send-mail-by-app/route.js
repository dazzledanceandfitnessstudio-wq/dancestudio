// app/api/send-mail-by-app/route.js
import { NextResponse } from 'next/server';
import { emailService } from '../../../lib/emailService'; // 👈 PATH FIX

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, subject, html } = body; // 👈 Sirf 3 fields

    // ── Validation ──
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { success: false, error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!html) {
      return NextResponse.json(
        { success: false, error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // ── Send Email ──
    const result = await emailService.sendMailByApp(email, subject, html);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully'
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to send email' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('SendMailByApp API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// ─── CORS for Flutter ──────────────────────────────────────
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}