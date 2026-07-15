// app/api/fcm/route.js
import { NextResponse } from 'next/server';
import { db, getDocs, collection, query, where } from '@/lib/firebase';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request) {
  try {
    const { notification, data } = await request.json();
    
    if (!notification) {
      return NextResponse.json(
        { success: false, error: 'Notification is required' },
        { status: 400 }
      );
    }

    const q = query(collection(db, 'users'), where('isAdmin', '==', true));
    const adminsSnapshot = await getDocs(q);
    
    const tokens = [];
    adminsSnapshot.docs.forEach(doc => {
      if (doc.data().fcmToken) tokens.push(doc.data().fcmToken);
    });

    if (tokens.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No admin FCM tokens found' },
        { status: 404 }
      );
    }

    await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: notification.title || 'Admin Notification',
        body: notification.body || 'You have a new notification',
      },
      data: data || {},
      android: { priority: 'high' }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Notification sent to ${tokens.length} admin(s)` 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}