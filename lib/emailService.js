// lib/emailService.js
import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dazzle-dance.com';

// 🔥 FIX: createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  tls: { rejectUnauthorized: false }
});

// ─── Email Template Generator ──────────────────────────────
function getEmailTemplate(title, content, buttonText, buttonLink, isSuccess = true) {
  const accentColor = isSuccess ? '#FF1F6D' : '#FFD93D';
  const gradient = isSuccess 
    ? 'linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%)' 
    : 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          margin-top: 40px;
          margin-bottom: 40px;
        }
        .header {
          background: ${gradient};
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          font-size: 28px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .header .logo {
          font-size: 48px;
          margin-bottom: 10px;
          display: block;
        }
        .header .subtitle {
          color: rgba(255,255,255,0.9);
          font-size: 16px;
          margin-top: 8px;
          font-weight: 400;
        }
        .body {
          padding: 40px 30px;
          background: #ffffff;
        }
        .body h2 {
          color: #1a1523;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .body p {
          color: #555555;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .body .highlight {
          background: #f8f5ff;
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid ${accentColor};
          margin: 20px 0;
        }
        .body .highlight strong {
          color: #1a1523;
        }
        .body .divider {
          height: 1px;
          background: #e8e6ed;
          margin: 24px 0;
        }
        .btn {
          display: inline-block;
          padding: 14px 32px;
          background: ${gradient};
          color: #ffffff;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          margin-top: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255,31,109,0.25);
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255,31,109,0.35);
        }
        .footer {
          background: #f8f5ff;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e8e6ed;
        }
        .footer p {
          color: #8c82a0;
          font-size: 14px;
          margin: 4px 0;
          line-height: 1.6;
        }
        .footer .social {
          margin-top: 12px;
        }
        .footer .social a {
          display: inline-block;
          margin: 0 8px;
          color: #8c82a0;
          text-decoration: none;
          font-size: 20px;
        }
        .footer .brand {
          color: #1a1523;
          font-weight: 700;
          font-size: 16px;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge-success {
          background: rgba(34, 197, 94, 0.12);
          color: #15803D;
        }
        .badge-warning {
          background: rgba(234, 179, 8, 0.12);
          color: #A16207;
        }
        .badge-info {
          background: rgba(59, 130, 246, 0.12);
          color: #1D4ED8;
        }
        @media (max-width: 480px) {
          .container { margin: 20px; border-radius: 12px; }
          .header { padding: 30px 20px; }
          .header h1 { font-size: 24px; }
          .body { padding: 30px 20px; }
          .btn { display: block; text-align: center; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="logo">💃</span>
          <h1>Dazzle Dance Studio</h1>
          <div class="subtitle">Where rhythm meets passion</div>
        </div>
        <div class="body">
          <h2>${title}</h2>
          ${content}
          ${buttonText && buttonLink ? `
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${buttonLink}" class="btn">${buttonText}</a>
            </div>
          ` : ''}
          <div class="divider"></div>
          <p style="font-size: 14px; color: #8c82a0; margin-bottom: 0;">
            This email was sent to you as a registered user of Dazzle Dance Studio.
          </p>
        </div>
        <div class="footer">
          <p class="brand">✨ Dazzle Dance Studio</p>
          <p>Dazzle Dance & Fitness Studio, Jabalpur</p>
          <p>
            <a href="mailto:dazzledanceandfitnessstudio@gmail.com" style="color: #8c82a0; text-decoration: none;">
              dazzledanceandfitnessstudio@gmail.com
            </a>
          </p>
          <div class="social">
            <a href="https://www.instagram.com/priya_dazzlestudio" target="_blank" rel="noopener">📸</a>
            <a href="https://www.facebook.com/share/14i2QhGkLd4" target="_blank" rel="noopener">👍</a>
          </div>
          <p style="font-size: 12px; color: #b0a8c0; margin-top: 12px;">
            © ${new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ─── Email Service ──────────────────────────────────────────
export const emailService = {
  sendMailByApp: async (email, subject, html, buttonText = null, buttonLink = null, isSuccess = true) => {
    try {
      const fullHtml = getEmailTemplate(
        subject.replace(/[🎉📝✅👋]/g, '').trim(),
        html,
        buttonText,
        buttonLink,
        isSuccess
      );

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: fullHtml,
      });
      return { success: true };
    } catch (error) {
      console.error('sendMailByApp error:', error);
      return { success: false, error: error.message };
    }
  },

  // ── Welcome Email ──
  sendWelcomeEmail: async (email, name) => {
    try {
      const content = `
        <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
        <p>We're absolutely thrilled to welcome you to the <strong>Dazzle Dance Studio</strong> family! 🎊</p>
        <div class="highlight">
          <p style="margin-bottom: 0;">
            <strong>🎯 Your dance journey starts now!</strong><br>
            Explore our courses, book your first class, and let the music move you.
          </p>
        </div>
        <p>Here's what you can do next:</p>
        <ul style="color: #555; line-height: 2; padding-left: 20px;">
          <li>🎵 Browse our <strong>dance programs</strong> - Bollywood, Hip-Hop, Kathak & more</li>
          <li>📅 <strong>Enroll</strong> in your favorite classes</li>
          <li>💃 Connect with our <strong>vibrant dance community</strong></li>
        </ul>
        <p>We can't wait to see you on the dance floor! 🌟</p>
        <p style="margin-top: 16px;">
          Keep dancing,<br>
          <strong>Team Dazzle</strong> 💫
        </p>
      `;

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: '🎉 Welcome to Dazzle Dance Studio!',
        html: getEmailTemplate(
          'Welcome to the Dazzle Family! 🎊',
          content,
          'Explore Dashboard',
          `${APP_URL}/dashboard`,
          true
        ),
      });
      return { success: true };
    } catch (error) {
      console.error('sendWelcomeEmail error:', error);
      return { success: false, error: error.message };
    }
  },

  // ─── Enrollment Request Email ──
  sendEnrollmentRequestEmail: async (email, name, eventTitle) => {
    try {
      const content = `
        <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
        <p>We've received your enrollment request for <strong>"${eventTitle}"</strong>.</p>
        <div class="highlight">
          <p style="margin-bottom: 0;">
            <span class="badge badge-warning">⏳ PENDING</span><br>
            <strong>Status:</strong> Your request is being reviewed by our team.<br>
            <span style="font-size: 14px; color: #8c82a0;">
              You'll receive a confirmation email once approved.
            </span>
          </p>
        </div>
        <p>🎯 <strong>What happens next?</strong></p>
        <ul style="color: #555; line-height: 2; padding-left: 20px;">
          <li>✅ Our team will review your request within 24-48 hours</li>
          <li>📧 You'll get a confirmation email once approved</li>
          <li>💃 Get ready to dance!</li>
        </ul>
        <p style="margin-top: 16px;">
          Thank you for choosing Dazzle Dance Studio! 🌟<br>
          <strong>Team Dazzle</strong> 💫
        </p>
      `;

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: '📝 Enrollment Request Submitted',
        html: getEmailTemplate(
          'Enrollment Request Received! 📝',
          content,
          'View My Events',
          `${APP_URL}/dashboard`,
          false
        ),
      });
      return { success: true };
    } catch (error) {
      console.error('sendEnrollmentRequestEmail error:', error);
      return { success: false, error: error.message };
    }
  },

  // ─── Enrollment Approval Email ──
  sendEnrollmentApprovalEmail: async (email, name, eventTitle) => {
    try {
      const content = `
        <p>Hello <strong>${name || 'Dancer'}</strong>! 🎉</p>
        <p>Great news! Your enrollment for <strong>"${eventTitle}"</strong> has been <strong>APPROVED</strong>! ✅</p>
        <div class="highlight">
          <p style="margin-bottom: 0;">
            <span class="badge badge-success">✅ APPROVED</span><br>
            <strong>You're all set!</strong> Your spot has been confirmed.<br>
            <span style="font-size: 14px; color: #8c82a0;">
              Check your dashboard for session details and meeting links.
            </span>
          </p>
        </div>
        <p>🎯 <strong>What's next?</strong></p>
        <ul style="color: #555; line-height: 2; padding-left: 20px;">
          <li>📅 Check your <strong>session schedule</strong> in the dashboard</li>
          <li>🔗 Join your classes using the <strong>meeting links</strong> provided</li>
          <li>💃 Get ready to dance and have fun!</li>
        </ul>
        <p style="margin-top: 16px;">
          We're so excited to have you join us! 🌟<br>
          <strong>Team Dazzle</strong> 💫
        </p>
      `;

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: '🎉 Enrollment Approved!',
        html: getEmailTemplate(
          "You're In! 🎉",
          content,
          'Go to Dashboard',
          `${APP_URL}/dashboard`,
          true
        ),
      });
      return { success: true };
    } catch (error) {
      console.error('sendEnrollmentApprovalEmail error:', error);
      return { success: false, error: error.message };
    }
  },

  // ─── Enrollment Rejection Email ──
  sendEnrollmentRejectionEmail: async (email, name, eventTitle, reason = null) => {
    try {
      const reasonText = reason 
        ? `<p style="color: #DC2626;"><strong>Reason:</strong> ${reason}</p>` 
        : '';

      const content = `
        <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
        <p>We regret to inform you that your enrollment for <strong>"${eventTitle}"</strong> could not be approved at this time.</p>
        <div class="highlight" style="border-left-color: #DC2626;">
          <p style="margin-bottom: 0;">
            <span class="badge badge-warning">❌ REJECTED</span><br>
            <span style="font-size: 14px; color: #8c82a0;">
              We review all applications carefully and this class is currently full.
            </span>
          </p>
          ${reasonText}
        </div>
        <p>💪 <strong>Don't give up!</strong></p>
        <ul style="color: #555; line-height: 2; padding-left: 20px;">
          <li>📅 Check out <strong>other available classes</strong></li>
          <li>🔔 <strong>Subscribe</strong> to get notified when new spots open</li>
          <li>💃 Keep dancing and stay passionate!</li>
        </ul>
        <p style="margin-top: 16px;">
          We hope to see you in another class soon! 🌟<br>
          <strong>Team Dazzle</strong> 💫
        </p>
      `;

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: '📢 Enrollment Update',
        html: getEmailTemplate(
          'Enrollment Status Update 📢',
          content,
          'Explore Other Classes',
          `${APP_URL}/events`,
          false
        ),
      });
      return { success: true };
    } catch (error) {
      console.error('sendEnrollmentRejectionEmail error:', error);
      return { success: false, error: error.message };
    }
  },

  // ─── Session Reminder Email ──
  sendSessionReminderEmail: async (email, name, sessionTitle, sessionDate, meetingLink) => {
    try {
      const formattedDate = sessionDate 
        ? new Date(sessionDate).toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        : 'Date TBD';

      const content = `
        <p>Hello <strong>${name || 'Dancer'}</strong>! 💃</p>
        <p>Just a friendly reminder about your upcoming session:</p>
        <div class="highlight">
          <p style="margin-bottom: 0;">
            <strong>📚 ${sessionTitle || 'Dance Session'}</strong><br>
            📅 <strong>When:</strong> ${formattedDate}<br>
            ${meetingLink ? `🔗 <strong>Join Link:</strong> <a href="${meetingLink}" style="color: #FF1F6D; text-decoration: none; word-break: break-all;">${meetingLink}</a>` : ''}
          </p>
        </div>
        <p>🎯 <strong>Tips for a great session:</strong></p>
        <ul style="color: #555; line-height: 2; padding-left: 20px;">
          <li>💧 Stay <strong>hydrated</strong> - bring water!</li>
          <li>👟 Wear <strong>comfortable</strong> dance clothes</li>
          <li>🌟 Come with <strong>energy</strong> and a smile!</li>
        </ul>
        <p style="margin-top: 16px;">
          See you on the dance floor! 💫<br>
          <strong>Team Dazzle</strong> 🎵
        </p>
      `;

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: '💃 Upcoming Session Reminder',
        html: getEmailTemplate(
          'Session Reminder! 💃',
          content,
          meetingLink ? 'Join Session' : 'View Dashboard',
          meetingLink || `${APP_URL}/dashboard`,
          true
        ),
      });
      return { success: true };
    } catch (error) {
      console.error('sendSessionReminderEmail error:', error);
      return { success: false, error: error.message };
    }
  },

  // ─── New Event Notification Email ──
  sendNewEventEmail: async (email, name, eventTitle, eventDate, eventDescription) => {
    try {
      const formattedDate = eventDate 
        ? new Date(eventDate).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        : 'Date TBD';

      const content = `
        <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
        <p>We're excited to announce a new event at Dazzle Dance Studio:</p>
        <div class="highlight">
          <p style="margin-bottom: 0;">
            <strong>🎯 ${eventTitle}</strong><br>
            📅 ${formattedDate}<br>
            ${eventDescription ? `📝 ${eventDescription}` : ''}
          </p>
        </div>
        <p>💃 <strong>Don't miss out!</strong> Spots fill up fast.</p>
        <p style="margin-top: 16px;">
          Let's dance! 🌟<br>
          <strong>Team Dazzle</strong> 💫
        </p>
      `;

      await transporter.sendMail({
        from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
        to: email,
        subject: '🎯 New Event Alert!',
        html: getEmailTemplate(
          'New Event Alert! 🎯',
          content,
          'View Event',
          `${APP_URL}/events`,
          true
        ),
      });
      return { success: true };
    } catch (error) {
      console.error('sendNewEventEmail error:', error);
      return { success: false, error: error.message };
    }
  },
};

// // lib/emailService.js
// import nodemailer from 'nodemailer';

// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dazzle-dance.com';

// const transporter = nodemailer.createTransporter({
//   service: 'gmail',
//   auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
//   tls: { rejectUnauthorized: false }
// });

// // ─── Email Template Generator ──────────────────────────────
// function getEmailTemplate(title, content, buttonText, buttonLink, isSuccess = true) {
//   const accentColor = isSuccess ? '#FF1F6D' : '#FFD93D';
//   const gradient = isSuccess 
//     ? 'linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%)' 
//     : 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)';

//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>${title}</title>
//       <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { 
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #f5f5f5;
//           margin: 0;
//           padding: 0;
//         }
//         .container {
//           max-width: 600px;
//           margin: 0 auto;
//           background: #ffffff;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.08);
//           margin-top: 40px;
//           margin-bottom: 40px;
//         }
//         .header {
//           background: ${gradient};
//           padding: 40px 30px;
//           text-align: center;
//         }
//         .header h1 {
//           color: #ffffff;
//           font-size: 28px;
//           font-weight: 800;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }
//         .header .logo {
//           font-size: 48px;
//           margin-bottom: 10px;
//           display: block;
//         }
//         .header .subtitle {
//           color: rgba(255,255,255,0.9);
//           font-size: 16px;
//           margin-top: 8px;
//           font-weight: 400;
//         }
//         .body {
//           padding: 40px 30px;
//           background: #ffffff;
//         }
//         .body h2 {
//           color: #1a1523;
//           font-size: 24px;
//           font-weight: 700;
//           margin-bottom: 16px;
//           line-height: 1.3;
//         }
//         .body p {
//           color: #555555;
//           font-size: 16px;
//           line-height: 1.7;
//           margin-bottom: 16px;
//         }
//         .body .highlight {
//           background: #f8f5ff;
//           padding: 16px 20px;
//           border-radius: 12px;
//           border-left: 4px solid ${accentColor};
//           margin: 20px 0;
//         }
//         .body .highlight strong {
//           color: #1a1523;
//         }
//         .body .divider {
//           height: 1px;
//           background: #e8e6ed;
//           margin: 24px 0;
//         }
//         .btn {
//           display: inline-block;
//           padding: 14px 32px;
//           background: ${gradient};
//           color: #ffffff;
//           text-decoration: none;
//           border-radius: 50px;
//           font-weight: 600;
//           font-size: 16px;
//           margin-top: 8px;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 15px rgba(255,31,109,0.25);
//         }
//         .btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(255,31,109,0.35);
//         }
//         .footer {
//           background: #f8f5ff;
//           padding: 30px;
//           text-align: center;
//           border-top: 1px solid #e8e6ed;
//         }
//         .footer p {
//           color: #8c82a0;
//           font-size: 14px;
//           margin: 4px 0;
//           line-height: 1.6;
//         }
//         .footer .social {
//           margin-top: 12px;
//         }
//         .footer .social a {
//           display: inline-block;
//           margin: 0 8px;
//           color: #8c82a0;
//           text-decoration: none;
//           font-size: 20px;
//         }
//         .footer .brand {
//           color: #1a1523;
//           font-weight: 700;
//           font-size: 16px;
//         }
//         .badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }
//         .badge-success {
//           background: rgba(34, 197, 94, 0.12);
//           color: #15803D;
//         }
//         .badge-warning {
//           background: rgba(234, 179, 8, 0.12);
//           color: #A16207;
//         }
//         .badge-info {
//           background: rgba(59, 130, 246, 0.12);
//           color: #1D4ED8;
//         }
//         @media (max-width: 480px) {
//           .container { margin: 20px; border-radius: 12px; }
//           .header { padding: 30px 20px; }
//           .header h1 { font-size: 24px; }
//           .body { padding: 30px 20px; }
//           .btn { display: block; text-align: center; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <span class="logo">💃</span>
//           <h1>Dazzle Dance Studio</h1>
//           <div class="subtitle">Where rhythm meets passion</div>
//         </div>
//         <div class="body">
//           <h2>${title}</h2>
//           ${content}
//           ${buttonText && buttonLink ? `
//             <div style="text-align: center; margin: 24px 0 8px;">
//               <a href="${buttonLink}" class="btn">${buttonText}</a>
//             </div>
//           ` : ''}
//           <div class="divider"></div>
//           <p style="font-size: 14px; color: #8c82a0; margin-bottom: 0;">
//             This email was sent to you as a registered user of Dazzle Dance Studio.
//           </p>
//         </div>
//         <div class="footer">
//           <p class="brand">✨ Dazzle Dance Studio</p>
//           <p>Dazzle Dance & Fitness Studio, Jabalpur</p>
//           <p>
//             <a href="mailto:dazzledanceandfitnessstudio@gmail.com" style="color: #8c82a0; text-decoration: none;">
//               dazzledanceandfitnessstudio@gmail.com
//             </a>
//           </p>
//           <div class="social">
//             <a href="https://www.instagram.com/priya_dazzlestudio" target="_blank" rel="noopener">📸</a>
//             <a href="https://www.facebook.com/share/14i2QhGkLd4" target="_blank" rel="noopener">👍</a>
//           </div>
//           <p style="font-size: 12px; color: #b0a8c0; margin-top: 12px;">
//             © ${new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// }

// // ─── Email Service ──────────────────────────────────────────
// export const emailService = {
//   /**
//    * Send email with custom subject and HTML content
//    * @param {string} email - Recipient email address
//    * @param {string} subject - Email subject
//    * @param {string} html - HTML content (will be wrapped in template)
//    * @param {string} buttonText - Optional button text
//    * @param {string} buttonLink - Optional button link
//    * @param {boolean} isSuccess - True for success theme, false for warning theme
//    */
//   sendMailByApp: async (email, subject, html, buttonText = null, buttonLink = null, isSuccess = true) => {
//     try {
//       const fullHtml = getEmailTemplate(
//         subject.replace(/[🎉📝✅👋]/g, '').trim(),
//         html,
//         buttonText,
//         buttonLink,
//         isSuccess
//       );

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: subject,
//         html: fullHtml,
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendMailByApp error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // ── Welcome Email ──
//   sendWelcomeEmail: async (email, name) => {
//     try {
//       const content = `
//         <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
//         <p>We're absolutely thrilled to welcome you to the <strong>Dazzle Dance Studio</strong> family! 🎊</p>
//         <div class="highlight">
//           <p style="margin-bottom: 0;">
//             <strong>🎯 Your dance journey starts now!</strong><br>
//             Explore our courses, book your first class, and let the music move you.
//           </p>
//         </div>
//         <p>Here's what you can do next:</p>
//         <ul style="color: #555; line-height: 2; padding-left: 20px;">
//           <li>🎵 Browse our <strong>dance programs</strong> - Bollywood, Hip-Hop, Kathak & more</li>
//           <li>📅 <strong>Enroll</strong> in your favorite classes</li>
//           <li>💃 Connect with our <strong>vibrant dance community</strong></li>
//         </ul>
//         <p>We can't wait to see you on the dance floor! 🌟</p>
//         <p style="margin-top: 16px;">
//           Keep dancing,<br>
//           <strong>Team Dazzle</strong> 💫
//         </p>
//       `;

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: '🎉 Welcome to Dazzle Dance Studio!',
//         html: getEmailTemplate(
//           'Welcome to the Dazzle Family! 🎊',
//           content,
//           'Explore Dashboard',
//           `${APP_URL}/dashboard`,
//           true
//         ),
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendWelcomeEmail error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // ─── Enrollment Request Email ──
//   sendEnrollmentRequestEmail: async (email, name, eventTitle) => {
//     try {
//       const content = `
//         <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
//         <p>We've received your enrollment request for <strong>"${eventTitle}"</strong>.</p>
//         <div class="highlight">
//           <p style="margin-bottom: 0;">
//             <span class="badge badge-warning">⏳ PENDING</span><br>
//             <strong>Status:</strong> Your request is being reviewed by our team.<br>
//             <span style="font-size: 14px; color: #8c82a0;">
//               You'll receive a confirmation email once approved.
//             </span>
//           </p>
//         </div>
//         <p>🎯 <strong>What happens next?</strong></p>
//         <ul style="color: #555; line-height: 2; padding-left: 20px;">
//           <li>✅ Our team will review your request within 24-48 hours</li>
//           <li>📧 You'll get a confirmation email once approved</li>
//           <li>💃 Get ready to dance!</li>
//         </ul>
//         <p style="margin-top: 16px;">
//           Thank you for choosing Dazzle Dance Studio! 🌟<br>
//           <strong>Team Dazzle</strong> 💫
//         </p>
//       `;

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: '📝 Enrollment Request Submitted',
//         html: getEmailTemplate(
//           'Enrollment Request Received! 📝',
//           content,
//           'View My Events',
//           `${APP_URL}/dashboard`,
//           false
//         ),
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendEnrollmentRequestEmail error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // ─── Enrollment Approval Email ──
//   sendEnrollmentApprovalEmail: async (email, name, eventTitle) => {
//     try {
//       const content = `
//         <p>Hello <strong>${name || 'Dancer'}</strong>! 🎉</p>
//         <p>Great news! Your enrollment for <strong>"${eventTitle}"</strong> has been <strong>APPROVED</strong>! ✅</p>
//         <div class="highlight">
//           <p style="margin-bottom: 0;">
//             <span class="badge badge-success">✅ APPROVED</span><br>
//             <strong>You're all set!</strong> Your spot has been confirmed.<br>
//             <span style="font-size: 14px; color: #8c82a0;">
//               Check your dashboard for session details and meeting links.
//             </span>
//           </p>
//         </div>
//         <p>🎯 <strong>What's next?</strong></p>
//         <ul style="color: #555; line-height: 2; padding-left: 20px;">
//           <li>📅 Check your <strong>session schedule</strong> in the dashboard</li>
//           <li>🔗 Join your classes using the <strong>meeting links</strong> provided</li>
//           <li>💃 Get ready to dance and have fun!</li>
//         </ul>
//         <p style="margin-top: 16px;">
//           We're so excited to have you join us! 🌟<br>
//           <strong>Team Dazzle</strong> 💫
//         </p>
//       `;

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: '🎉 Enrollment Approved!',
//         html: getEmailTemplate(
//           "You're In! 🎉",
//           content,
//           'Go to Dashboard',
//           `${APP_URL}/dashboard`,
//           true
//         ),
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendEnrollmentApprovalEmail error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // ─── Enrollment Rejection Email ──
//   sendEnrollmentRejectionEmail: async (email, name, eventTitle, reason = null) => {
//     try {
//       const reasonText = reason 
//         ? `<p style="color: #DC2626;"><strong>Reason:</strong> ${reason}</p>` 
//         : '';

//       const content = `
//         <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
//         <p>We regret to inform you that your enrollment for <strong>"${eventTitle}"</strong> could not be approved at this time.</p>
//         <div class="highlight" style="border-left-color: #DC2626;">
//           <p style="margin-bottom: 0;">
//             <span class="badge badge-warning">❌ REJECTED</span><br>
//             <span style="font-size: 14px; color: #8c82a0;">
//               We review all applications carefully and this class is currently full.
//             </span>
//           </p>
//           ${reasonText}
//         </div>
//         <p>💪 <strong>Don't give up!</strong></p>
//         <ul style="color: #555; line-height: 2; padding-left: 20px;">
//           <li>📅 Check out <strong>other available classes</strong></li>
//           <li>🔔 <strong>Subscribe</strong> to get notified when new spots open</li>
//           <li>💃 Keep dancing and stay passionate!</li>
//         </ul>
//         <p style="margin-top: 16px;">
//           We hope to see you in another class soon! 🌟<br>
//           <strong>Team Dazzle</strong> 💫
//         </p>
//       `;

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: '📢 Enrollment Update',
//         html: getEmailTemplate(
//           'Enrollment Status Update 📢',
//           content,
//           'Explore Other Classes',
//           `${APP_URL}/events`,
//           false
//         ),
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendEnrollmentRejectionEmail error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // ─── Session Reminder Email ──
//   sendSessionReminderEmail: async (email, name, sessionTitle, sessionDate, meetingLink) => {
//     try {
//       const formattedDate = sessionDate 
//         ? new Date(sessionDate).toLocaleString('en-US', {
//             weekday: 'long',
//             month: 'long',
//             day: 'numeric',
//             year: 'numeric',
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true
//           })
//         : 'Date TBD';

//       const content = `
//         <p>Hello <strong>${name || 'Dancer'}</strong>! 💃</p>
//         <p>Just a friendly reminder about your upcoming session:</p>
//         <div class="highlight">
//           <p style="margin-bottom: 0;">
//             <strong>📚 ${sessionTitle || 'Dance Session'}</strong><br>
//             📅 <strong>When:</strong> ${formattedDate}<br>
//             ${meetingLink ? `🔗 <strong>Join Link:</strong> <a href="${meetingLink}" style="color: #FF1F6D; text-decoration: none; word-break: break-all;">${meetingLink}</a>` : ''}
//           </p>
//         </div>
//         <p>🎯 <strong>Tips for a great session:</strong></p>
//         <ul style="color: #555; line-height: 2; padding-left: 20px;">
//           <li>💧 Stay <strong>hydrated</strong> - bring water!</li>
//           <li>👟 Wear <strong>comfortable</strong> dance clothes</li>
//           <li>🌟 Come with <strong>energy</strong> and a smile!</li>
//         </ul>
//         <p style="margin-top: 16px;">
//           See you on the dance floor! 💫<br>
//           <strong>Team Dazzle</strong> 🎵
//         </p>
//       `;

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: '💃 Upcoming Session Reminder',
//         html: getEmailTemplate(
//           'Session Reminder! 💃',
//           content,
//           meetingLink ? 'Join Session' : 'View Dashboard',
//           meetingLink || `${APP_URL}/dashboard`,
//           true
//         ),
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendSessionReminderEmail error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // ─── New Event Notification Email ──
//   sendNewEventEmail: async (email, name, eventTitle, eventDate, eventDescription) => {
//     try {
//       const formattedDate = eventDate 
//         ? new Date(eventDate).toLocaleString('en-US', {
//             month: 'long',
//             day: 'numeric',
//             year: 'numeric',
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true
//           })
//         : 'Date TBD';

//       const content = `
//         <p>Hello <strong>${name || 'Dancer'}</strong>! 👋</p>
//         <p>We're excited to announce a new event at Dazzle Dance Studio:</p>
//         <div class="highlight">
//           <p style="margin-bottom: 0;">
//             <strong>🎯 ${eventTitle}</strong><br>
//             📅 ${formattedDate}<br>
//             ${eventDescription ? `📝 ${eventDescription}` : ''}
//           </p>
//         </div>
//         <p>💃 <strong>Don't miss out!</strong> Spots fill up fast.</p>
//         <p style="margin-top: 16px;">
//           Let's dance! 🌟<br>
//           <strong>Team Dazzle</strong> 💫
//         </p>
//       `;

//       await transporter.sendMail({
//         from: `"Dazzle Dance Studio" <${EMAIL_USER}>`,
//         to: email,
//         subject: '🎯 New Event Alert!',
//         html: getEmailTemplate(
//           'New Event Alert! 🎯',
//           content,
//           'View Event',
//           `${APP_URL}/events`,
//           true
//         ),
//       });
//       return { success: true };
//     } catch (error) {
//       console.error('sendNewEventEmail error:', error);
//       return { success: false, error: error.message };
//     }
//   },
// };



// // // lib/emailService.js
// // import nodemailer from 'nodemailer';

// // const EMAIL_USER = process.env.EMAIL_USER;
// // const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// // const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
// //   tls: { rejectUnauthorized: false }
// // });

// // export const emailService = {
// //   sendWelcomeEmail: async (email, name) => {
// //     try {
// //       await transporter.sendMail({
// //         from: `"Dance Academy" <${EMAIL_USER}>`,
// //         to: email,
// //         subject: 'Welcome to Dance Academy! 🎉',
// //         html: `
// //           <h2>Hello ${name || 'Dancer'}! 👋</h2>
// //           <p>Welcome to Dance Academy!</p>
// //           <a href="${APP_URL}/dashboard">Go to Dashboard</a>
// //           <p>Keep dancing! 💃</p>
// //         `
// //       });
// //       return { success: true };
// //     } catch (error) {
// //       return { success: false, error: error.message };
// //     }
// //   },

// //   sendEnrollmentRequestEmail: async (email, name, eventTitle) => {
// //     try {
// //       await transporter.sendMail({
// //         from: `"Dance Academy" <${EMAIL_USER}>`,
// //         to: email,
// //         subject: 'Enrollment Request Submitted 📝',
// //         html: `
// //           <h2>Hello ${name || 'Dancer'}!</h2>
// //           <p>Your enrollment for <strong>"${eventTitle}"</strong> is <strong>PENDING</strong>.</p>
// //           <a href="${APP_URL}/my-events">View My Events</a>
// //         `
// //       });
// //       return { success: true };
// //     } catch (error) {
// //       return { success: false, error: error.message };
// //     }
// //   },

// //   sendEnrollmentApprovalEmail: async (email, name, eventTitle) => {
// //     try {
// //       await transporter.sendMail({
// //         from: `"Dance Academy" <${EMAIL_USER}>`,
// //         to: email,
// //         subject: '🎉 Enrollment Approved!',
// //         html: `
// //           <h2>Congratulations ${name || 'Dancer'}!</h2>
// //           <p>Your enrollment for <strong>"${eventTitle}"</strong> is <strong>APPROVED</strong>! ✅</p>
// //           <a href="${APP_URL}/my-events">View My Events</a>
// //         `
// //       });
// //       return { success: true };
// //     } catch (error) {
// //       return { success: false, error: error.message };
// //     }
// //   }
// // };