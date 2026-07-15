// lib/emailService.js
import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  tls: { rejectUnauthorized: false }
});

export const emailService = {
  sendWelcomeEmail: async (email, name) => {
    try {
      await transporter.sendMail({
        from: `"Dance Academy" <${EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Dance Academy! 🎉',
        html: `
          <h2>Hello ${name || 'Dancer'}! 👋</h2>
          <p>Welcome to Dance Academy!</p>
          <a href="${APP_URL}/dashboard">Go to Dashboard</a>
          <p>Keep dancing! 💃</p>
        `
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendEnrollmentRequestEmail: async (email, name, eventTitle) => {
    try {
      await transporter.sendMail({
        from: `"Dance Academy" <${EMAIL_USER}>`,
        to: email,
        subject: 'Enrollment Request Submitted 📝',
        html: `
          <h2>Hello ${name || 'Dancer'}!</h2>
          <p>Your enrollment for <strong>"${eventTitle}"</strong> is <strong>PENDING</strong>.</p>
          <a href="${APP_URL}/my-events">View My Events</a>
        `
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendEnrollmentApprovalEmail: async (email, name, eventTitle) => {
    try {
      await transporter.sendMail({
        from: `"Dance Academy" <${EMAIL_USER}>`,
        to: email,
        subject: '🎉 Enrollment Approved!',
        html: `
          <h2>Congratulations ${name || 'Dancer'}!</h2>
          <p>Your enrollment for <strong>"${eventTitle}"</strong> is <strong>APPROVED</strong>! ✅</p>
          <a href="${APP_URL}/my-events">View My Events</a>
        `
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};