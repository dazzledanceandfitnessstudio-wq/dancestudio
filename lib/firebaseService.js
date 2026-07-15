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
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
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
        
        // Send welcome email
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'welcome',
            email: user.email,
            name: user.displayName
          })
        });
        
        // Send FCM to Admin
        await fetch('/api/fcm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            notification: {
              title: 'New User Registered',
              body: `${user.displayName || 'A new user'} has joined!`
            },
            data: {
              type: 'NEW_USER',
              userId: user.uid
            }
          })
        });
      }
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signInWithOneTap: async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  handleRedirectResult: async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
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
          
          await fetch('/api/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'welcome',
              email: user.email,
              name: user.displayName
            })
          });
          
          await fetch('/api/fcm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              notification: {
                title: 'New User Registered',
                body: `${user.displayName || 'A new user'} has joined!`
              },
              data: {
                type: 'NEW_USER',
                userId: user.uid
              }
            })
          });
        }
        return { success: true, user };
      }
      return { success: false };
    } catch (error) {
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

      // Send email to user
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'enrollment-request',
          email: userData.email,
          name: userData.name,
          eventTitle: eventData.title
        })
      });

      // Send FCM to Admin
      await fetch('/api/fcm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notification: {
            title: 'New Enrollment Request',
            body: `${userData.name} wants to enroll in "${eventData.title}"`
          },
          data: {
            type: 'ENROLLMENT_REQUEST',
            eventId, userId, enrollmentId: enrollmentRef.id
          }
        })
      });

      return { success: true, enrollmentId: enrollmentRef.id, status: 'PENDING' };
    } catch (error) {
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