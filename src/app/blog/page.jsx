'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import { getPosts, deletePost } from '@/lib/api';
import useAuthStore from '@/store/authStore';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data.posts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        setError('Failed to delete post');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  console.log("isAuthenticatedisAuthenticated" , isAuthenticated)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
        <p className="text-gray-600">Explore the latest articles from our community</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-medium text-gray-700">No posts yet</h2>
          <p className="text-gray-500 mt-2">Be the first to create a post!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post} 
              isAuthor={isAuthenticated && user?.id === post.userId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}