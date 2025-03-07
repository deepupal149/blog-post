'use client';

import BlogForm from '@/components/BlogForm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CreatePostPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Blog Post</h1>
        <BlogForm />
      </div>
    </ProtectedRoute>
  );
}