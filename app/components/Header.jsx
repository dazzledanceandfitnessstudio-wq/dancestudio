"use client";
import { useState, useEffect } from 'react';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import Link from "next/link";
import Image from "next/image";
import { Sparkles, User, LogIn, LogOut, LayoutDashboard, UserCircle, Menu, X, Moon, Sun } from "lucide-react";

export default function Header({ user, onSignIn, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Google OneTap
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
          fedcm_support: true,
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <Image 
              src="/dazzle-logo.jpg" 
              alt="Dazzle Logo" 
              width={40} 
              height={40} 
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              DAZZLE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {['Courses', 'Events', 'Services', 'Posts', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`}
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-1/2"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Dark/Light Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:rotate-12"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                  >
                    {user.photoURL ? (
                      <Image 
                        src={user.photoURL} 
                        alt={user.displayName} 
                        width={32} 
                        height={32} 
                        className="rounded-full ring-2 ring-purple-500/50 group-hover:ring-purple-500 transition-all"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.displayName?.[0] || 'U'}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                      {user.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50 animate-[slideDown_0.2s_ease-out] origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                        <Link 
                          href="/dashboard" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <UserCircle className="w-4 h-4" />
                          Profile
                        </Link>
                        <button 
                          onClick={() => {
                            setIsDropdownOpen(false);
                            onSignOut();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full border-t border-gray-100 dark:border-gray-700"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={onSignIn}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4" />
                    Log In
                  </button>
                  <button 
                    onClick={onSignIn}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4" />
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`
        lg:hidden fixed inset-x-0 top-16 md:top-20 bg-white dark:bg-gray-900 shadow-lg 
        transition-all duration-300 ease-in-out overflow-hidden
        ${isMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="px-4 py-4 space-y-1">
          {['Courses', 'Events', 'Services', 'Posts', 'About', 'Contact', 'Dashboard'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          
          {/* Mobile Auth */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt={user.displayName} width={36} height={36} className="rounded-full" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSignOut();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSignIn();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSignIn();
                  }}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animation for dropdown */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}






// "use client";
// import { useEffect } from 'react';
// import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
// import Link from "next/link";
// import Image from "next/image";
// import { Sparkles, User, LogIn } from "lucide-react";

// export default function Header({ user, onSignIn, onSignOut }) {

//   useEffect(() => {
//     if (user) return;

//     const auth = getAuth();

//     const handleCredentialResponse = async (response) => {
//       try {
//         const credential = GoogleAuthProvider.credential(response.credential);
//         await signInWithCredential(auth, credential);
//         console.log("Successfully signed in with Google One Tap!");
//       } catch (error) {
//         console.error("Error signing in with One Tap:", error);
//       }
//     };

//     const initializeGoogleOneTap = () => {
//       if (typeof window !== 'undefined' && window.google?.accounts?.id) {
//         window.google.accounts.id.initialize({
//           client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//           callback: handleCredentialResponse,
//           cancel_on_tap_outside: false, 
//         });

//         window.google.accounts.id.prompt((notification) => {
//           if (notification.isNotDisplayed()) {
//             console.warn("One Tap not displayed:", notification.getNotDisplayedReason());
//           } else if (notification.isSkippedMoment()) {
//             console.warn("One Tap skipped:", notification.getSkippedReason());
//           }
//         });
//       }
//     };

//     let retryCount = 0;
//     const checkGoogleScript = setInterval(() => {
//       if (typeof window !== 'undefined' && window.google?.accounts?.id) {
//         clearInterval(checkGoogleScript);
//         initializeGoogleOneTap();
//       } else if (retryCount > 10) {
//         clearInterval(checkGoogleScript);
//         console.warn("Google Identity script failed to load in time.");
//       }
//       retryCount++;
//     }, 500);

//     return () => clearInterval(checkGoogleScript);
//   }, [user]);
//   return (
//     <nav className="ld-navbar">
//       <div className="ld-container ld-navbar-inner">
//         <Link href="/" className="ld-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={40} height={40} style={{ borderRadius: '8px' }} />
//           DAZZLE
//         </Link>

//         <ul className="ld-nav-links">
//           <li><Link href="/courses">Courses</Link></li>
//           <li><Link href="/events">Events</Link></li>
//           <li><Link href="/services">Services</Link></li>
//           <li><Link href="/posts">News</Link></li>
//           <li><Link href="/about">About</Link></li>
//           <li><Link href="/contact">Contact</Link></li>
//           <li><Link href="/dashboard">Dashboard</Link></li>
//         </ul>

//         <div className="ld-nav-actions">
//           {user ? (
//             <>
//               <Link href="/dashboard" className="ld-btn-login">
//                 <User size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
//                 {user.displayName?.split(" ")[0] || "Dashboard"}
//               </Link>
//               <button className="ld-btn-login" onClick={onSignOut}>
//                 Sign Out
//               </button>
//             </>
//           ) : (
//             <>
//               <button className="ld-btn-login" onClick={onSignIn}>
//                 <LogIn size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
//                 Log In
//               </button>
//               <button className="ld-btn-signup" onClick={onSignIn}>
//                 Sign Up
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
