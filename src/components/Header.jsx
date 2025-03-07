'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Next.js Blog
          </Link>

          <nav>
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
                    <span className="text-gray-400">Hi, {user?.name}</span>
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
      </div>
    </header>
  );
}