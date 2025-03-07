'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPostById, deletePost } from '@/lib/api';
import useAuthStore from '@/store/authStore';
import { formatDate } from '@/lib/utils';

export default function BlogDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        router.push('/blog');
      } catch (err) {
        setError('Failed to delete post');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link href="/blog" className="text-blue-500 hover:text-blue-700">
          Back to blog
        </Link>
      </div>
    );
  }

  console.log("isAuthenticatedisAuthenticated" , isAuthenticated , user)
  const isAuthor = isAuthenticated && user?.id === post.userId;

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/blog" className="text-blue-500 hover:text-blue-700">
          ← Back to all posts
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-gray-600 mb-8">
        <p>By <span className="font-medium">{post.authorName}</span></p>
        <p>Published on {formatDate(post.createdAt)}</p>
        {post.updatedAt && <p>Updated on {formatDate(post.updatedAt)}</p>}
      </div>

      <div className="prose max-w-none mb-10">
        <p className="whitespace-pre-line">{post.body}</p>
      </div>

      {isAuthor && (
        <div className="flex space-x-4 pt-6 border-t">
          <Link
            href={`/edit/${post.id}`}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete Post
          </button>
        </div>
      )}
    </article>
  );
}