'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import useAuthStore from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const registered = searchParams.get('registered');

  useEffect(() => {
    // Redirect to home if already authenticated
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Login to Your Account</h1>
      
      {registered && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Registration successful! Please login with your credentials.
        </div>
      )}
      
      <LoginForm />
    </div>
  );
}