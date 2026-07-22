// app/api/email/route.js
import { NextResponse } from 'next/server';
import { emailService } from '@/lib/emailService';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, email, name, phone, subject, message, eventTitle } = body;

    let result;

    switch (type) {
      case 'welcome':
        result = await emailService.sendWelcomeEmail(email, name);
        break;
      
      case 'login':
        result = await emailService.sendLoginEmail(email, name);
        break;
      
      case 'contact-form':
        if (!name || !email || !message) {
          return NextResponse.json(
            { success: false, error: 'Name, email, and message are required' },
            { status: 400 }
          );
        }
        result = await emailService.sendContactFormEmail(name, email, phone, subject, message);
        break;
      
      case 'enrollment-request':
        result = await emailService.sendEnrollmentRequestEmail(email, name, eventTitle);
        break;
      
      case 'enrollment-approval':
        result = await emailService.sendEnrollmentApprovalEmail(email, name, eventTitle);
        break;
      
      case 'enrollment-rejection':
        const { reason } = body;
        result = await emailService.sendEnrollmentRejectionEmail(email, name, eventTitle, reason);
        break;
      
      case 'session-reminder':
        const { sessionTitle, sessionDate, meetingLink } = body;
        result = await emailService.sendSessionReminderEmail(email, name, sessionTitle, sessionDate, meetingLink);
        break;
      
      case 'new-event':
        const { eventDate, eventDescription } = body;
        result = await emailService.sendNewEventEmail(email, name, eventTitle, eventDate, eventDescription);
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}











// // app/api/email/route.js
// import { NextResponse } from 'next/server';
// import { emailService } from '@/lib/emailService';

// export async function POST(request) {
//   try {
//     const { type, email, name, eventTitle } = await request.json();

//     if (!email) {
//       return NextResponse.json(
//         { success: false, error: 'Email is required' },
//         { status: 400 }
//       );
//     }

//     let result;

//     switch (type) {
//       case 'welcome':
//         result = await emailService.sendWelcomeEmail(email, name);
//         break;
//       case 'enrollment-request':
//         result = await emailService.sendEnrollmentRequestEmail(email, name, eventTitle);
//         break;
//       case 'enrollment-approval':
//         result = await emailService.sendEnrollmentApprovalEmail(email, name, eventTitle);
//         break;
//       default:
//         return NextResponse.json(
//           { success: false, error: 'Invalid type. Use: welcome, enrollment-request, enrollment-approval' },
//           { status: 400 }
//         );
//     }

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }