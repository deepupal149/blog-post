import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post, isAuthor, onDelete }) {
  const { id, title, body, authorName, createdAt } = post;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <Link href={`/blog/${id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">{title}</h2>
        </Link>
        <p className="text-gray-600 mb-4">
          By <span className="font-medium">{authorName}</span> • {formatDate(createdAt)}
        </p>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {body.substring(0, 150)}
          {body.length > 150 ? '...' : ''}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            href={`/blog/${id}`}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Read More →
          </Link>
          
          {isAuthor && (
            <div className="flex space-x-2">
              <Link 
                href={`/edit/${id}`}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Edit
              </Link>
              <button 
                onClick={() => onDelete(id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}