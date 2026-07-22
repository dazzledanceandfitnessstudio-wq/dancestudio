// app/api/fcm/route.js
import { NextResponse } from 'next/server';

let admin = null;
let adminInitialized = false;

async function getAdmin() {
  if (admin) return admin;
  
  try {
    const adminModule = await import('firebase-admin');
    admin = adminModule.default || adminModule;
    return admin;
  } catch (error) {
    console.error('❌ Failed to load firebase-admin:', error.message);
    return null;
  }
}

async function initializeAdmin() {
  if (adminInitialized) return true;
  
  try {
    const adminInstance = await getAdmin();
    if (!adminInstance) {
      console.error('❌ Firebase Admin not available');
      return false;
    }
    
    if (adminInstance.apps && adminInstance.apps.length > 0) {
      adminInitialized = true;
      console.log('✅ Firebase Admin already initialized');
      return true;
    }
    
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    
    if (!privateKey || !projectId || !clientEmail) {
      console.error('❌ Missing environment variables');
      return false;
    }
    
    let cleanKey = privateKey.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
    
    console.log('📧 Project:', projectId);
    console.log('📧 Client:', clientEmail);
    console.log('🔑 Private key length:', cleanKey.length);
    
    adminInstance.initializeApp({
      credential: adminInstance.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: cleanKey,
      }),
    });
    
    adminInitialized = true;
    console.log('✅ Firebase Admin initialized successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Firebase Admin error:', error.message);
    return false;
  }
}

export async function POST(request) {
  try {
    console.log('🔵 [FCM] ========== NEW REQUEST ==========');
    
    const isInitialized = await initializeAdmin();
    if (!isInitialized) {
      return NextResponse.json(
        { success: false, error: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('🔵 [FCM] Request:', JSON.stringify(body, null, 2));

    // ─── CASE 1: Register FCM Token ───
    if (body.token && body.userId) {
      const { token, userId, email } = body;
      
      try {
        // 🔥 FIX: Use admin.firestore() instead of client SDK
        const firestore = admin.firestore();
        const userRef = firestore.collection('users').doc(userId);
        
        await userRef.update({
          fcmToken: token,
          fcmTokenUpdatedAt: new Date().toISOString()
        });
        
        console.log(`✅ FCM token saved for user ${userId}`);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('❌ Firestore error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to save token' },
          { status: 500 }
        );
      }
    }

    // ─── CASE 2: Send Notification to Admins ───
    if (body.notification) {
      const { notification, data } = body;
      
      try {
        // 🔥 FIX: Use admin.firestore() instead of client SDK
        const firestore = admin.firestore();
        const adminsSnapshot = await firestore
          .collection('users')
          .where('isAdmin', '==', true)
          .get();
        
        console.log(`🔵 [FCM] Total Admins: ${adminsSnapshot.size}`);
        
        const adminTokens = [];
        const adminEmails = [];
        
        adminsSnapshot.docs.forEach(doc => {
          const userData = doc.data();
          if (userData.fcmToken) {
            adminTokens.push(userData.fcmToken);
            adminEmails.push(userData.email || 'unknown');
            console.log(`   ✅ ${userData.email} - Token: YES`);
          } else {
            console.log(`   ❌ ${userData.email} - Token: NO`);
          }
        });

        if (adminTokens.length === 0) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'No admin FCM tokens found',
              adminEmails: adminEmails
            },
            { status: 404 }
          );
        }

        console.log(`🔵 [FCM] Sending to ${adminTokens.length} admins:`, adminEmails);
        
        const adminInstance = await getAdmin();
        const response = await adminInstance.messaging().sendEachForMulticast({
          tokens: adminTokens,
          notification: {
            title: notification.title || 'Admin Notification',
            body: notification.body || 'You have a new notification',
          },
          data: data || {},
          android: { 
            priority: 'high', 
            notification: { sound: 'default' } 
          }
        });

        console.log(`✅ Success: ${response.successCount}, Failed: ${response.failureCount}`);

        return NextResponse.json({ 
          success: true,
          successCount: response.successCount,
          failureCount: response.failureCount,
          adminEmails: adminEmails
        });

      } catch (error) {
        console.error('❌ FCM Error:', error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );

  } catch (error) {
    console.error('❌ FCM Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}