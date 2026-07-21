// lib/firebaseService.js
import { 
  db, auth, googleProvider, signInWithPopup, signInWithRedirect,
  getRedirectResult, onAuthStateChanged, signOut,
  collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp, onSnapshot, increment
} from './firebase';

// ============ AUTH SERVICE ============
export const authService = {
  signInWithGoogle: async () => {
    try {
      console.log('🔵 [Auth] signInWithGoogle started');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('✅ [Auth] User signed in:', user.email);
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        console.log('📝 [Auth] New user, creating profile...');
        
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName || 'User',
          email: user.email,
          photoUrl: user.photoURL || '',
          isAdmin: false,
          isActive: true,
          phone: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          fcmToken: ''
        });
        
        // ─── 📧 SEND WELCOME EMAIL ───
        console.log('📧 [Email] Sending welcome email to:', user.email);
        try {
          const emailResponse = await fetch('/api/send-mail-by-app', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              subject: '🎉 Welcome to Dazzle Dance Studio!',
              html: `
                <h2>Welcome ${user.displayName || 'Dancer'}! 👋</h2>
                <p>We're absolutely thrilled to welcome you to the <strong>Dazzle Dance Studio</strong> family! 🎊</p>
                <div style="background: #f8f5ff; padding: 16px; border-radius: 12px; border-left: 4px solid #FF1F6D;">
                  <p><strong>🎯 Your dance journey starts now!</strong></p>
                  <p>Explore our courses, book your first class, and let the music move you.</p>
                </div>
                <div style="text-align: center; margin: 24px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
                     style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF1F6D, #7B2FFF); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
                    Explore Dashboard
                  </a>
                </div>
                <p>Keep dancing! 💃</p>
              `
            })
          });
          
          const emailData = await emailResponse.json();
          console.log('📧 [Email] Response:', emailData);
          
          if (emailResponse.ok) {
            console.log('✅ [Email] Welcome email sent successfully');
          } else {
            console.error('❌ [Email] Failed to send:', emailData);
          }
        } catch (emailError) {
          console.error('❌ [Email] Exception:', emailError.message);
        }
        
        // ─── 🔔 SEND FCM TO ADMIN ───
        console.log('🔔 [FCM] Sending admin notification...');
        try {
          const fcmResponse = await fetch('/api/fcm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              notification: {
                title: '🕺 New User Registered!',
                body: `${user.displayName || 'A new dancer'} has joined Dazzle!`
              },
              data: {
                type: 'NEW_USER',
                userId: user.uid,
                name: user.displayName || 'New User',
                email: user.email || 'No email'
              }
            })
          });
          
          const fcmData = await fcmResponse.json();
          console.log('🔔 [FCM] Response:', fcmData);
          
          if (fcmResponse.ok) {
            console.log('✅ [FCM] Admin notification sent successfully');
          } else {
            console.error('❌ [FCM] Failed to send:', fcmData);
          }
        } catch (fcmError) {
          console.error('❌ [FCM] Exception:', fcmError.message);
        }
        
      } else {
        console.log('📝 [Auth] Existing user found');
      }
      
      return { success: true, user };
    } catch (error) {
      console.error('❌ [Auth] signInWithGoogle error:', error.message);
      return { success: false, error: error.message };
    }
  },

  signInWithOneTap: async () => {
    try {
      console.log('🔵 [Auth] signInWithOneTap started');
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('❌ [Auth] signInWithOneTap error:', error.message);
      return { success: false, error: error.message };
    }
  },

  handleRedirectResult: async () => {
    try {
      console.log('🔵 [Auth] handleRedirectResult started');
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        console.log('✅ [Auth] Redirect user:', user.email);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          console.log('📝 [Auth] New user from redirect, creating profile...');
          
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName || 'User',
            email: user.email,
            photoUrl: user.photoURL || '',
            isAdmin: false,
            isActive: true,
            phone: '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            fcmToken: ''
          });
          
          // ─── 📧 SEND WELCOME EMAIL ───
          console.log('📧 [Email] Sending welcome email to:', user.email);
          try {
            const emailResponse = await fetch('/api/send-mail-by-app', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: user.email,
                subject: '🎉 Welcome to Dazzle Dance Studio!',
                html: `
                  <h2>Welcome ${user.displayName || 'Dancer'}! 👋</h2>
                  <p>We're absolutely thrilled to welcome you to the <strong>Dazzle Dance Studio</strong> family! 🎊</p>
                  <div style="background: #f8f5ff; padding: 16px; border-radius: 12px; border-left: 4px solid #FF1F6D;">
                    <p><strong>🎯 Your dance journey starts now!</strong></p>
                    <p>Explore our courses, book your first class, and let the music move you.</p>
                  </div>
                  <div style="text-align: center; margin: 24px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
                       style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF1F6D, #7B2FFF); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
                      Explore Dashboard
                    </a>
                  </div>
                  <p>Keep dancing! 💃</p>
                `
              })
            });
            
            const emailData = await emailResponse.json();
            console.log('📧 [Email] Response:', emailData);
            
            if (emailResponse.ok) {
              console.log('✅ [Email] Welcome email sent successfully');
            } else {
              console.error('❌ [Email] Failed to send:', emailData);
            }
          } catch (emailError) {
            console.error('❌ [Email] Exception:', emailError.message);
          }
          
          // ─── 🔔 SEND FCM TO ADMIN ───
          console.log('🔔 [FCM] Sending admin notification...');
          try {
            const fcmResponse = await fetch('/api/fcm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                notification: {
                  title: '🕺 New User Registered!',
                  body: `${user.displayName || 'A new dancer'} has joined Dazzle!`
                },
                data: {
                  type: 'NEW_USER',
                  userId: user.uid,
                  name: user.displayName || 'New User',
                  email: user.email || 'No email'
                }
              })
            });
            
            const fcmData = await fcmResponse.json();
            console.log('🔔 [FCM] Response:', fcmData);
            
            if (fcmResponse.ok) {
              console.log('✅ [FCM] Admin notification sent successfully');
            } else {
              console.error('❌ [FCM] Failed to send:', fcmData);
            }
          } catch (fcmError) {
            console.error('❌ [FCM] Exception:', fcmError.message);
          }
        }
        return { success: true, user };
      }
      console.log('ℹ️ [Auth] No redirect result');
      return { success: false };
    } catch (error) {
      console.error('❌ [Auth] handleRedirectResult error:', error.message);
      return { success: false, error: error.message };
    }
  },

  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  },

  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getUserProfile: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) return { id: userDoc.id, ...userDoc.data() };
      return null;
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (userId, data) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...data,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  isAdmin: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) return userDoc.data().isAdmin === true;
      return false;
    } catch (error) {
      return false;
    }
  }
};

// ============ POST SERVICE ============
export const postService = {
  getAllPosts: async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  },

  getPost: async (postId) => {
    try {
      const postDoc = await getDoc(doc(db, 'posts', postId));
      if (postDoc.exists()) return { id: postDoc.id, ...postDoc.data() };
      return null;
    } catch (error) {
      throw error;
    }
  }
};

// ============ EVENT SERVICE ============
export const eventService = {
  getAllEvents: async () => {
    try {
      const q = query(
        collection(db, 'events'),
        where('status', '==', 'ACTIVE'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  },

  getEvent: async (eventId) => {
    try {
      const eventDoc = await getDoc(doc(db, 'events', eventId));
      if (eventDoc.exists()) return { id: eventDoc.id, ...eventDoc.data() };
      return null;
    } catch (error) {
      throw error;
    }
  },

  getUserEnrolledEvents: async (userId) => {
    try {
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId),
        where('status', '==', 'APPROVED')
      );
      const snapshot = await getDocs(q);
      const eventIds = snapshot.docs.map(doc => doc.data().eventId);
      if (eventIds.length === 0) return [];
      
      const eventPromises = eventIds.map(id => getDoc(doc(db, 'events', id)));
      const eventDocs = await Promise.all(eventPromises);
      return eventDocs.filter(doc => doc.exists()).map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  },

  isUserEnrolled: async (userId, eventId) => {
    try {
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId),
        where('eventId', '==', eventId)
      );
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      return false;
    }
  },

  getEnrollmentStatus: async (userId, eventId) => {
    try {
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId),
        where('eventId', '==', eventId)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) return snapshot.docs[0].data().status;
      return null;
    } catch (error) {
      return null;
    }
  }
};

// ============ ENROLLMENT SERVICE ============
export const enrollmentService = {
  requestEnrollment: async (userId, eventId) => {
    try {
      console.log('🔵 [Enrollment] Requesting enrollment for user:', userId, 'event:', eventId);
      
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId),
        where('eventId', '==', eventId)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) throw new Error('Already enrolled or pending');

      const eventDoc = await getDoc(doc(db, 'events', eventId));
      if (!eventDoc.exists()) throw new Error('Event not found');
      const eventData = eventDoc.data();

      const enrollmentRef = await addDoc(collection(db, 'enrollments'), {
        userId, eventId, status: 'PENDING',
        requestedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      await updateDoc(doc(db, 'events', eventId), {
        pendingCount: increment(1)
      });

      const userDoc = await getDoc(doc(db, 'users', userId));
      const userData = userDoc.data();

      // ─── 📧 SEND ENROLLMENT REQUEST EMAIL ───
      console.log('📧 [Email] Sending enrollment request email to:', userData.email);
      try {
        const emailResponse = await fetch('/api/send-mail-by-app', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userData.email,
            subject: '📝 Enrollment Request Submitted',
            html: `
              <h2>Hello ${userData.name || 'Dancer'}! 👋</h2>
              <p>We've received your enrollment request for <strong>"${eventData.title}"</strong>.</p>
              <div style="background: #f8f5ff; padding: 16px; border-radius: 12px; border-left: 4px solid #FFD93D;">
                <p><span style="display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(234,179,8,0.12); color: #A16207; font-size: 12px; font-weight: 700; text-transform: uppercase;">⏳ PENDING</span></p>
                <p><strong>Status:</strong> Your request is being reviewed by our team.</p>
                <p style="font-size: 14px; color: #8c82a0;">You'll receive a confirmation email once approved.</p>
              </div>
              <p>🎯 <strong>What happens next?</strong></p>
              <ul style="color: #555; line-height: 2; padding-left: 20px;">
                <li>✅ Our team will review your request within 24-48 hours</li>
                <li>📧 You'll get a confirmation email once approved</li>
                <li>💃 Get ready to dance!</li>
              </ul>
              <div style="text-align: center; margin: 24px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
                   style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FFD93D, #FF6B6B); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
                  View My Events
                </a>
              </div>
              <p>Thank you for choosing Dazzle Dance Studio! 🌟</p>
              <p><strong>Team Dazzle</strong> 💫</p>
            `
          })
        });
        
        const emailData = await emailResponse.json();
        console.log('📧 [Email] Response:', emailData);
        
        if (emailResponse.ok) {
          console.log('✅ [Email] Enrollment request email sent successfully');
        } else {
          console.error('❌ [Email] Failed to send:', emailData);
        }
      } catch (emailError) {
        console.error('❌ [Email] Exception:', emailError.message);
      }

      // ─── 🔔 SEND FCM TO ADMIN ───
      console.log('🔔 [FCM] Sending enrollment notification to admin...');
      try {
        const fcmResponse = await fetch('/api/fcm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            notification: {
              title: '📝 New Enrollment Request',
              body: `${userData.name || 'A user'} wants to enroll in "${eventData.title}"`
            },
            data: {
              type: 'ENROLLMENT_REQUEST',
              eventId, 
              userId, 
              enrollmentId: enrollmentRef.id,
              userName: userData.name || 'User',
              eventTitle: eventData.title
            }
          })
        });
        
        const fcmData = await fcmResponse.json();
        console.log('🔔 [FCM] Response:', fcmData);
        
        if (fcmResponse.ok) {
          console.log('✅ [FCM] Enrollment notification sent to admin');
        } else {
          console.error('❌ [FCM] Failed to send:', fcmData);
        }
      } catch (fcmError) {
        console.error('❌ [FCM] Exception:', fcmError.message);
      }

      return { success: true, enrollmentId: enrollmentRef.id, status: 'PENDING' };
    } catch (error) {
      console.error('❌ [Enrollment] Error:', error.message);
      throw error;
    }
  },

  getUserEnrollments: async (userId) => {
    try {
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  },

  cancelEnrollment: async (enrollmentId, eventId) => {
    try {
      await deleteDoc(doc(db, 'enrollments', enrollmentId));
      await updateDoc(doc(db, 'events', eventId), {
        pendingCount: increment(-1)
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

// ============ SESSION SERVICE ============
export const sessionService = {
  getSessionsByEvent: async (eventId) => {
    try {
      const q = query(
        collection(db, 'sessions'),
        where('eventId', '==', eventId),
        where('isActive', '==', true),
        orderBy('sessionDate', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  },

  getSession: async (sessionId) => {
    try {
      const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
      if (sessionDoc.exists()) return { id: sessionDoc.id, ...sessionDoc.data() };
      return null;
    } catch (error) {
      throw error;
    }
  },

  getSessionUpdates: async (sessionId) => {
    try {
      const q = query(
        collection(db, 'session_updates'),
        where('sessionId', '==', sessionId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }
};

// ============ NOTIFICATION SERVICE ============
export const notificationService = {
  subscribeToEnrollments: (userId, callback) => {
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const enrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(enrollments);
    });
  },

  subscribeToEvent: (eventId, callback) => {
    return onSnapshot(doc(db, 'events', eventId), (doc) => {
      if (doc.exists()) callback({ id: doc.id, ...doc.data() });
    });
  },

  subscribeToSessionUpdates: (sessionId, callback) => {
    const q = query(
      collection(db, 'session_updates'),
      where('sessionId', '==', sessionId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const updates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(updates);
    });
  },

  subscribeToUserProfile: (userId, callback) => {
    return onSnapshot(doc(db, 'users', userId), (doc) => {
      if (doc.exists()) callback({ id: doc.id, ...doc.data() });
    });
  }
};

// // lib/firebaseService.js
// import { 
//   db, auth, googleProvider, signInWithPopup, signInWithRedirect,
//   getRedirectResult, onAuthStateChanged, signOut,
//   collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc,
//   query, where, orderBy, limit, serverTimestamp, onSnapshot, increment
// } from './firebase';

// // ============ AUTH SERVICE ============
// export const authService = {
//   signInWithGoogle: async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const userDoc = await getDoc(doc(db, 'users', user.uid));
      
//       if (!userDoc.exists()) {
//         await setDoc(doc(db, 'users', user.uid), {
//           name: user.displayName || 'User',
//           email: user.email,
//           photoUrl: user.photoURL || '',
//           isAdmin: false,
//           isActive: true,
//           phone: '',
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp(),
//           fcmToken: ''
//         });
        
//         // 🔥 Send welcome email using new API
//         try {
//           await fetch('/api/send-mail-by-app', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               email: user.email,
//               subject: '🎉 Welcome to Dazzle Dance Studio!',
//               html: `
//                 <h2>Welcome ${user.displayName || 'Dancer'}! 👋</h2>
//                 <p>We're absolutely thrilled to welcome you to the <strong>Dazzle Dance Studio</strong> family! 🎊</p>
//                 <div style="background: #f8f5ff; padding: 16px; border-radius: 12px; border-left: 4px solid #FF1F6D;">
//                   <p><strong>🎯 Your dance journey starts now!</strong></p>
//                   <p>Explore our courses, book your first class, and let the music move you.</p>
//                 </div>
//                 <div style="text-align: center; margin: 24px 0;">
//                   <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
//                      style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF1F6D, #7B2FFF); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
//                     Explore Dashboard
//                   </a>
//                 </div>
//                 <p>Keep dancing! 💃</p>
//               `
//             })
//           });
//         } catch (emailError) {
//           console.error('Welcome email failed:', emailError);
//         }
        
//         // 🔥 Send FCM to Admin
//         try {
//           await fetch('/api/fcm', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               notification: {
//                 title: '🕺 New User Registered!',
//                 body: `${user.displayName || 'A new dancer'} has joined Dazzle!`
//               },
//               data: {
//                 type: 'NEW_USER',
//                 userId: user.uid,
//                 name: user.displayName || 'New User',
//                 email: user.email || 'No email'
//               }
//             })
//           });
//         } catch (fcmError) {
//           console.error('FCM notification failed:', fcmError);
//         }
//       }
//       return { success: true, user };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   signInWithOneTap: async () => {
//     try {
//       await signInWithRedirect(auth, googleProvider);
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   handleRedirectResult: async () => {
//     try {
//       const result = await getRedirectResult(auth);
//       if (result) {
//         const user = result.user;
//         const userDoc = await getDoc(doc(db, 'users', user.uid));
        
//         if (!userDoc.exists()) {
//           await setDoc(doc(db, 'users', user.uid), {
//             name: user.displayName || 'User',
//             email: user.email,
//             photoUrl: user.photoURL || '',
//             isAdmin: false,
//             isActive: true,
//             phone: '',
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//             fcmToken: ''
//           });
          
//           // 🔥 Send welcome email using new API
//           try {
//             await fetch('/api/send-mail-by-app', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 email: user.email,
//                 subject: '🎉 Welcome to Dazzle Dance Studio!',
//                 html: `
//                   <h2>Welcome ${user.displayName || 'Dancer'}! 👋</h2>
//                   <p>We're absolutely thrilled to welcome you to the <strong>Dazzle Dance Studio</strong> family! 🎊</p>
//                   <div style="background: #f8f5ff; padding: 16px; border-radius: 12px; border-left: 4px solid #FF1F6D;">
//                     <p><strong>🎯 Your dance journey starts now!</strong></p>
//                     <p>Explore our courses, book your first class, and let the music move you.</p>
//                   </div>
//                   <div style="text-align: center; margin: 24px 0;">
//                     <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
//                        style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF1F6D, #7B2FFF); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
//                       Explore Dashboard
//                     </a>
//                   </div>
//                   <p>Keep dancing! 💃</p>
//                 `
//               })
//             });
//           } catch (emailError) {
//             console.error('Welcome email failed:', emailError);
//           }
          
//           // 🔥 Send FCM to Admin
//           try {
//             await fetch('/api/fcm', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 notification: {
//                   title: '🕺 New User Registered!',
//                   body: `${user.displayName || 'A new dancer'} has joined Dazzle!`
//                 },
//                 data: {
//                   type: 'NEW_USER',
//                   userId: user.uid,
//                   name: user.displayName || 'New User',
//                   email: user.email || 'No email'
//                 }
//               })
//             });
//           } catch (fcmError) {
//             console.error('FCM notification failed:', fcmError);
//           }
//         }
//         return { success: true, user };
//       }
//       return { success: false };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   getCurrentUser: () => {
//     return new Promise((resolve, reject) => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         unsubscribe();
//         resolve(user);
//       }, reject);
//     });
//   },

//   signOut: async () => {
//     try {
//       await signOut(auth);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   getUserProfile: async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
//       if (userDoc.exists()) return { id: userDoc.id, ...userDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   },

//   updateUserProfile: async (userId, data) => {
//     try {
//       await updateDoc(doc(db, 'users', userId), {
//         ...data,
//         updatedAt: serverTimestamp()
//       });
//       return { success: true };
//     } catch (error) {
//       throw error;
//     }
//   },

//   isAdmin: async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
//       if (userDoc.exists()) return userDoc.data().isAdmin === true;
//       return false;
//     } catch (error) {
//       return false;
//     }
//   }
// };

// // ============ POST SERVICE ============
// export const postService = {
//   getAllPosts: async () => {
//     try {
//       const q = query(
//         collection(db, 'posts'),
//         where('isPublished', '==', true),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   getPost: async (postId) => {
//     try {
//       const postDoc = await getDoc(doc(db, 'posts', postId));
//       if (postDoc.exists()) return { id: postDoc.id, ...postDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// // ============ EVENT SERVICE ============
// export const eventService = {
//   getAllEvents: async () => {
//     try {
//       const q = query(
//         collection(db, 'events'),
//         where('status', '==', 'ACTIVE'),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   getEvent: async (eventId) => {
//     try {
//       const eventDoc = await getDoc(doc(db, 'events', eventId));
//       if (eventDoc.exists()) return { id: eventDoc.id, ...eventDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getUserEnrolledEvents: async (userId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('status', '==', 'APPROVED')
//       );
//       const snapshot = await getDocs(q);
//       const eventIds = snapshot.docs.map(doc => doc.data().eventId);
//       if (eventIds.length === 0) return [];
      
//       const eventPromises = eventIds.map(id => getDoc(doc(db, 'events', id)));
//       const eventDocs = await Promise.all(eventPromises);
//       return eventDocs.filter(doc => doc.exists()).map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   isUserEnrolled: async (userId, eventId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('eventId', '==', eventId)
//       );
//       const snapshot = await getDocs(q);
//       return !snapshot.empty;
//     } catch (error) {
//       return false;
//     }
//   },

//   getEnrollmentStatus: async (userId, eventId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('eventId', '==', eventId)
//       );
//       const snapshot = await getDocs(q);
//       if (!snapshot.empty) return snapshot.docs[0].data().status;
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }
// };

// // ============ ENROLLMENT SERVICE ============
// export const enrollmentService = {
//   requestEnrollment: async (userId, eventId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('eventId', '==', eventId)
//       );
//       const snapshot = await getDocs(q);
//       if (!snapshot.empty) throw new Error('Already enrolled or pending');

//       const eventDoc = await getDoc(doc(db, 'events', eventId));
//       if (!eventDoc.exists()) throw new Error('Event not found');
//       const eventData = eventDoc.data();

//       const enrollmentRef = await addDoc(collection(db, 'enrollments'), {
//         userId, eventId, status: 'PENDING',
//         requestedAt: serverTimestamp(),
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp()
//       });

//       await updateDoc(doc(db, 'events', eventId), {
//         pendingCount: increment(1)
//       });

//       const userDoc = await getDoc(doc(db, 'users', userId));
//       const userData = userDoc.data();

//       // 🔥 Send enrollment request email using new API
//       try {
//         await fetch('/api/send-mail-by-app', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email: userData.email,
//             subject: '📝 Enrollment Request Submitted',
//             html: `
//               <h2>Hello ${userData.name || 'Dancer'}! 👋</h2>
//               <p>We've received your enrollment request for <strong>"${eventData.title}"</strong>.</p>
//               <div style="background: #f8f5ff; padding: 16px; border-radius: 12px; border-left: 4px solid #FFD93D;">
//                 <p><span style="display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(234,179,8,0.12); color: #A16207; font-size: 12px; font-weight: 700; text-transform: uppercase;">⏳ PENDING</span></p>
//                 <p><strong>Status:</strong> Your request is being reviewed by our team.</p>
//                 <p style="font-size: 14px; color: #8c82a0;">You'll receive a confirmation email once approved.</p>
//               </div>
//               <p>🎯 <strong>What happens next?</strong></p>
//               <ul style="color: #555; line-height: 2; padding-left: 20px;">
//                 <li>✅ Our team will review your request within 24-48 hours</li>
//                 <li>📧 You'll get a confirmation email once approved</li>
//                 <li>💃 Get ready to dance!</li>
//               </ul>
//               <div style="text-align: center; margin: 24px 0;">
//                 <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
//                    style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FFD93D, #FF6B6B); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
//                   View My Events
//                 </a>
//               </div>
//               <p>Thank you for choosing Dazzle Dance Studio! 🌟</p>
//               <p><strong>Team Dazzle</strong> 💫</p>
//             `
//           })
//         });
//       } catch (emailError) {
//         console.error('Enrollment request email failed:', emailError);
//       }

//       // 🔥 Send FCM to Admin
//       try {
//         await fetch('/api/fcm', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             notification: {
//               title: '📝 New Enrollment Request',
//               body: `${userData.name || 'A user'} wants to enroll in "${eventData.title}"`
//             },
//             data: {
//               type: 'ENROLLMENT_REQUEST',
//               eventId, 
//               userId, 
//               enrollmentId: enrollmentRef.id,
//               userName: userData.name || 'User',
//               eventTitle: eventData.title
//             }
//           })
//         });
//       } catch (fcmError) {
//         console.error('FCM notification failed:', fcmError);
//       }

//       return { success: true, enrollmentId: enrollmentRef.id, status: 'PENDING' };
//     } catch (error) {
//       throw error;
//     }
//   },

//   getUserEnrollments: async (userId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   cancelEnrollment: async (enrollmentId, eventId) => {
//     try {
//       await deleteDoc(doc(db, 'enrollments', enrollmentId));
//       await updateDoc(doc(db, 'events', eventId), {
//         pendingCount: increment(-1)
//       });
//       return { success: true };
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// // ============ SESSION SERVICE ============
// export const sessionService = {
//   getSessionsByEvent: async (eventId) => {
//     try {
//       const q = query(
//         collection(db, 'sessions'),
//         where('eventId', '==', eventId),
//         where('isActive', '==', true),
//         orderBy('sessionDate', 'asc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   getSession: async (sessionId) => {
//     try {
//       const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
//       if (sessionDoc.exists()) return { id: sessionDoc.id, ...sessionDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getSessionUpdates: async (sessionId) => {
//     try {
//       const q = query(
//         collection(db, 'session_updates'),
//         where('sessionId', '==', sessionId),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// // ============ NOTIFICATION SERVICE ============
// export const notificationService = {
//   subscribeToEnrollments: (userId, callback) => {
//     const q = query(
//       collection(db, 'enrollments'),
//       where('userId', '==', userId),
//       orderBy('createdAt', 'desc')
//     );
//     return onSnapshot(q, (snapshot) => {
//       const enrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       callback(enrollments);
//     });
//   },

//   subscribeToEvent: (eventId, callback) => {
//     return onSnapshot(doc(db, 'events', eventId), (doc) => {
//       if (doc.exists()) callback({ id: doc.id, ...doc.data() });
//     });
//   },

//   subscribeToSessionUpdates: (sessionId, callback) => {
//     const q = query(
//       collection(db, 'session_updates'),
//       where('sessionId', '==', sessionId),
//       orderBy('createdAt', 'desc')
//     );
//     return onSnapshot(q, (snapshot) => {
//       const updates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       callback(updates);
//     });
//   },

//   subscribeToUserProfile: (userId, callback) => {
//     return onSnapshot(doc(db, 'users', userId), (doc) => {
//       if (doc.exists()) callback({ id: doc.id, ...doc.data() });
//     });
//   }
// };





// // lib/firebaseService.js
// import { 
//   db, auth, googleProvider, signInWithPopup, signInWithRedirect,
//   getRedirectResult, onAuthStateChanged, signOut,
//   collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc,
//   query, where, orderBy, limit, serverTimestamp, onSnapshot, increment
// } from './firebase';

// // ============ AUTH SERVICE ============
// export const authService = {
//   signInWithGoogle: async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const userDoc = await getDoc(doc(db, 'users', user.uid));
      
//       if (!userDoc.exists()) {
//         await setDoc(doc(db, 'users', user.uid), {
//           name: user.displayName || 'User',
//           email: user.email,
//           photoUrl: user.photoURL || '',
//           isAdmin: false,
//           isActive: true,
//           phone: '',
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp(),
//           fcmToken: ''
//         });
        
//         // Send welcome email
//         await fetch('/api/email', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             type: 'welcome',
//             email: user.email,
//             name: user.displayName
//           })
//         });
        
//         // Send FCM to Admin
//         await fetch('/api/fcm', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             notification: {
//               title: 'New User Registered',
//               body: `${user.displayName || 'A new user'} has joined!`
//             },
//             data: {
//               type: 'NEW_USER',
//               userId: user.uid
//             }
//           })
//         });
//       }
//       return { success: true, user };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   signInWithOneTap: async () => {
//     try {
//       await signInWithRedirect(auth, googleProvider);
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   handleRedirectResult: async () => {
//     try {
//       const result = await getRedirectResult(auth);
//       if (result) {
//         const user = result.user;
//         const userDoc = await getDoc(doc(db, 'users', user.uid));
        
//         if (!userDoc.exists()) {
//           await setDoc(doc(db, 'users', user.uid), {
//             name: user.displayName || 'User',
//             email: user.email,
//             photoUrl: user.photoURL || '',
//             isAdmin: false,
//             isActive: true,
//             phone: '',
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//             fcmToken: ''
//           });
          
//           await fetch('/api/email', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               type: 'welcome',
//               email: user.email,
//               name: user.displayName
//             })
//           });
          
//           await fetch('/api/fcm', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               notification: {
//                 title: 'New User Registered',
//                 body: `${user.displayName || 'A new user'} has joined!`
//               },
//               data: {
//                 type: 'NEW_USER',
//                 userId: user.uid
//               }
//             })
//           });
//         }
//         return { success: true, user };
//       }
//       return { success: false };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   getCurrentUser: () => {
//     return new Promise((resolve, reject) => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         unsubscribe();
//         resolve(user);
//       }, reject);
//     });
//   },

//   signOut: async () => {
//     try {
//       await signOut(auth);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   },

//   getUserProfile: async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
//       if (userDoc.exists()) return { id: userDoc.id, ...userDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   },

//   updateUserProfile: async (userId, data) => {
//     try {
//       await updateDoc(doc(db, 'users', userId), {
//         ...data,
//         updatedAt: serverTimestamp()
//       });
//       return { success: true };
//     } catch (error) {
//       throw error;
//     }
//   },

//   isAdmin: async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
//       if (userDoc.exists()) return userDoc.data().isAdmin === true;
//       return false;
//     } catch (error) {
//       return false;
//     }
//   }
// };

// // ============ POST SERVICE ============
// export const postService = {
//   getAllPosts: async () => {
//     try {
//       const q = query(
//         collection(db, 'posts'),
//         where('isPublished', '==', true),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   getPost: async (postId) => {
//     try {
//       const postDoc = await getDoc(doc(db, 'posts', postId));
//       if (postDoc.exists()) return { id: postDoc.id, ...postDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// // ============ EVENT SERVICE ============
// export const eventService = {
//   getAllEvents: async () => {
//     try {
//       const q = query(
//         collection(db, 'events'),
//         where('status', '==', 'ACTIVE'),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   getEvent: async (eventId) => {
//     try {
//       const eventDoc = await getDoc(doc(db, 'events', eventId));
//       if (eventDoc.exists()) return { id: eventDoc.id, ...eventDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getUserEnrolledEvents: async (userId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('status', '==', 'APPROVED')
//       );
//       const snapshot = await getDocs(q);
//       const eventIds = snapshot.docs.map(doc => doc.data().eventId);
//       if (eventIds.length === 0) return [];
      
//       const eventPromises = eventIds.map(id => getDoc(doc(db, 'events', id)));
//       const eventDocs = await Promise.all(eventPromises);
//       return eventDocs.filter(doc => doc.exists()).map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   isUserEnrolled: async (userId, eventId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('eventId', '==', eventId)
//       );
//       const snapshot = await getDocs(q);
//       return !snapshot.empty;
//     } catch (error) {
//       return false;
//     }
//   },

//   getEnrollmentStatus: async (userId, eventId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('eventId', '==', eventId)
//       );
//       const snapshot = await getDocs(q);
//       if (!snapshot.empty) return snapshot.docs[0].data().status;
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }
// };

// // ============ ENROLLMENT SERVICE ============
// export const enrollmentService = {
//   requestEnrollment: async (userId, eventId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         where('eventId', '==', eventId)
//       );
//       const snapshot = await getDocs(q);
//       if (!snapshot.empty) throw new Error('Already enrolled or pending');

//       const eventDoc = await getDoc(doc(db, 'events', eventId));
//       if (!eventDoc.exists()) throw new Error('Event not found');
//       const eventData = eventDoc.data();

//       const enrollmentRef = await addDoc(collection(db, 'enrollments'), {
//         userId, eventId, status: 'PENDING',
//         requestedAt: serverTimestamp(),
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp()
//       });

//       await updateDoc(doc(db, 'events', eventId), {
//         pendingCount: increment(1)
//       });

//       const userDoc = await getDoc(doc(db, 'users', userId));
//       const userData = userDoc.data();

//       // Send email to user
//       await fetch('/api/email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           type: 'enrollment-request',
//           email: userData.email,
//           name: userData.name,
//           eventTitle: eventData.title
//         })
//       });

//       // Send FCM to Admin
//       await fetch('/api/fcm', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           notification: {
//             title: 'New Enrollment Request',
//             body: `${userData.name} wants to enroll in "${eventData.title}"`
//           },
//           data: {
//             type: 'ENROLLMENT_REQUEST',
//             eventId, userId, enrollmentId: enrollmentRef.id
//           }
//         })
//       });

//       return { success: true, enrollmentId: enrollmentRef.id, status: 'PENDING' };
//     } catch (error) {
//       throw error;
//     }
//   },

//   getUserEnrollments: async (userId) => {
//     try {
//       const q = query(
//         collection(db, 'enrollments'),
//         where('userId', '==', userId),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   cancelEnrollment: async (enrollmentId, eventId) => {
//     try {
//       await deleteDoc(doc(db, 'enrollments', enrollmentId));
//       await updateDoc(doc(db, 'events', eventId), {
//         pendingCount: increment(-1)
//       });
//       return { success: true };
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// // ============ SESSION SERVICE ============
// export const sessionService = {
//   getSessionsByEvent: async (eventId) => {
//     try {
//       const q = query(
//         collection(db, 'sessions'),
//         where('eventId', '==', eventId),
//         where('isActive', '==', true),
//         orderBy('sessionDate', 'asc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   },

//   getSession: async (sessionId) => {
//     try {
//       const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
//       if (sessionDoc.exists()) return { id: sessionDoc.id, ...sessionDoc.data() };
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getSessionUpdates: async (sessionId) => {
//     try {
//       const q = query(
//         collection(db, 'session_updates'),
//         where('sessionId', '==', sessionId),
//         orderBy('createdAt', 'desc')
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// // ============ NOTIFICATION SERVICE ============
// export const notificationService = {
//   subscribeToEnrollments: (userId, callback) => {
//     const q = query(
//       collection(db, 'enrollments'),
//       where('userId', '==', userId),
//       orderBy('createdAt', 'desc')
//     );
//     return onSnapshot(q, (snapshot) => {
//       const enrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       callback(enrollments);
//     });
//   },

//   subscribeToEvent: (eventId, callback) => {
//     return onSnapshot(doc(db, 'events', eventId), (doc) => {
//       if (doc.exists()) callback({ id: doc.id, ...doc.data() });
//     });
//   },

//   subscribeToSessionUpdates: (sessionId, callback) => {
//     const q = query(
//       collection(db, 'session_updates'),
//       where('sessionId', '==', sessionId),
//       orderBy('createdAt', 'desc')
//     );
//     return onSnapshot(q, (snapshot) => {
//       const updates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       callback(updates);
//     });
//   },

//   subscribeToUserProfile: (userId, callback) => {
//     return onSnapshot(doc(db, 'users', userId), (doc) => {
//       if (doc.exists()) callback({ id: doc.id, ...doc.data() });
//     });
//   }
// };