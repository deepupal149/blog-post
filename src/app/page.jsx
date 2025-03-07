import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <section className="text-center max-w-4xl">
                <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Blog Platform</h1>
                <p className="text-xl mb-8">
                    A simple blog platform built with Next.js, where you can share your thoughts and ideas.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        href="/blog"
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Read Blog Posts
                    </Link>
                    <Link
                        href="/register"
                        className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Create Account
                    </Link>
                </div>
            </section>

        </div>
    );
}