"use client";
import { useEffect } from 'react';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import Link from "next/link";
import Image from "next/image";
import { Sparkles, User, LogIn } from "lucide-react";

export default function Header({ user, onSignIn, onSignOut }) {

  useEffect(() => {
    if (user) return;

    const auth = getAuth();

    const handleCredentialResponse = async (response) => {
      try {
        const credential = GoogleAuthProvider.credential(response.credential);
        await signInWithCredential(auth, credential);
        console.log("Successfully signed in with Google One Tap!");
      } catch (error) {
        console.error("Error signing in with One Tap:", error);
      }
    };

    const initializeGoogleOneTap = () => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          cancel_on_tap_outside: false, 
        });

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.warn("One Tap not displayed:", notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.warn("One Tap skipped:", notification.getSkippedReason());
          }
        });
      }
    };

    let retryCount = 0;
    const checkGoogleScript = setInterval(() => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        clearInterval(checkGoogleScript);
        initializeGoogleOneTap();
      } else if (retryCount > 10) {
        clearInterval(checkGoogleScript);
        console.warn("Google Identity script failed to load in time.");
      }
      retryCount++;
    }, 500);

    return () => clearInterval(checkGoogleScript);
  }, [user]);
  return (
    <nav className="ld-navbar">
      <div className="ld-container ld-navbar-inner">
        <Link href="/" className="ld-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={40} height={40} style={{ borderRadius: '8px' }} />
          DAZZLE
        </Link>

        <ul className="ld-nav-links">
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/posts">News</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>

        <div className="ld-nav-actions">
          {user ? (
            <>
              <Link href="/dashboard" className="ld-btn-login">
                <User size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
                {user.displayName?.split(" ")[0] || "Dashboard"}
              </Link>
              <button className="ld-btn-login" onClick={onSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="ld-btn-login" onClick={onSignIn}>
                <LogIn size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
                Log In
              </button>
              <button className="ld-btn-signup" onClick={onSignIn}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
