// app/api/email/route.js
import { NextResponse } from 'next/server';
import { emailService } from '@/lib/emailService';

export async function POST(request) {
  try {
    const { type, email, name, eventTitle } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'welcome':
        result = await emailService.sendWelcomeEmail(email, name);
        break;
      case 'enrollment-request':
        result = await emailService.sendEnrollmentRequestEmail(email, name, eventTitle);
        break;
      case 'enrollment-approval':
        result = await emailService.sendEnrollmentApprovalEmail(email, name, eventTitle);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type. Use: welcome, enrollment-request, enrollment-approval' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}