// lib/fcmService.js
import { db, updateDoc, doc } from './firebase';

export const fcmService = {
  storeFCMToken: async (userId, token) => {
    try {
      if (!token) return;
      await updateDoc(doc(db, 'users', userId), {
        fcmToken: token,
        fcmTokenUpdatedAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // 🔥 Sirf API call - kuch import nahi
  notifyAdmin: async (notification, data) => {
    try {
      const response = await fetch('/api/fcm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notification, data })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};