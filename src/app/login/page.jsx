'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import useAuthStore from '@/store/authStore';

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        // Redirect to home if already authenticated
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="max-w-lg mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Login to Your Account</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}