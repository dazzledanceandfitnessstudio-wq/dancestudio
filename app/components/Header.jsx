"use client";

import Link from "next/link";
import { Sparkles, User, LogIn } from "lucide-react";

export default function Header({ user, onSignIn, onSignOut }) {
  return (
    <nav className="ld-navbar">
      <div className="ld-container ld-navbar-inner">
        <Link href="/" className="ld-logo">
          <Sparkles size={22} color="#FF1F6D" />
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
