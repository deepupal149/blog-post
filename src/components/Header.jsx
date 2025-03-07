'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Next.js Blog
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-gray-300 ${pathname === '/' ? 'font-bold' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className={`hover:text-gray-300 ${pathname === '/blog' ? 'font-bold' : ''}`}
                >
                  Blog
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      href="/create" 
                      className={`hover:text-gray-300 ${pathname === '/create' ? 'font-bold' : ''}`}
                    >
                      Create Post
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="hover:text-gray-300"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <span className="text-gray-400">Hi, {user?.firstName}</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      href="/login" 
                      className={`hover:text-gray-300 ${pathname === '/login' ? 'font-bold' : ''}`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/register" 
                      className={`hover:text-gray-300 ${pathname === '/register' ? 'font-bold' : ''}`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link 
                  href="/" 
                  className={`block hover:text-gray-300 ${pathname === '/' ? 'font-bold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className={`block hover:text-gray-300 ${pathname === '/blog' ? 'font-bold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      href="/create" 
                      className={`block hover:text-gray-300 ${pathname === '/create' ? 'font-bold' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Post
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block hover:text-gray-300 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <span className="block text-gray-400">Hi, {user?.firstName}</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      href="/login" 
                      className={`block hover:text-gray-300 ${pathname === '/login' ? 'font-bold' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/register" 
                      className={`block hover:text-gray-300 ${pathname === '/register' ? 'font-bold' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}