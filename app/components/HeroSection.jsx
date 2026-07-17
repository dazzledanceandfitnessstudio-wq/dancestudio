"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection({ user, onSignIn }) {
  return (
    <div className="ld-hero-split">
      <div className="ld-hero-media">
        <img
          src="https://media4.giphy.com/media/13hxeOYjoTWtK8/giphy.gif"
          alt="Dance performance"
        />
      </div>
      <div className="ld-hero-content">
        {user ? (
          <>
            <h1>
              WELCOME
              <br />
              BACK,
              <br />
              {(user.displayName?.split(" ")[0] || "DANCER").toUpperCase()}
            </h1>
            <p>
              Your dashboard is ready. Track your classes, discover new events,
              and stay in rhythm.
            </p>
            <Link href="/dashboard" className="btn-gradient-cta">
              <Sparkles size={18} />
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <h1>
              REACH
              <br />
              YOUR
              <br />
              DANCE
              <br />
              GOALS
            </h1>
            <p>
              With world-class instructors, intensive programs, and a vibrant community.
            </p>
            <button className="btn-gradient-cta" onClick={onSignIn}>
              Get Started
            </button>
          </>
        )}
      </div>
    </div>
  );
}
