// frontend/src/pages/SinglePostPage.jsx

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams(); // to get the post ID from URL
  const navigate = useNavigate();

  // 1. Fetching single post data from the API
  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post.');
        setLoading(false);
      });
  }, [id]);

  // 2. Delete Handler (Level 2 Requirement)
  const handleDelete = () => {
    // Feature: Delete confirmation
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`/blogs/${id}`)
        .then(() => {
          // On success, navigate back to the home page
          navigate('/');
        })
        .catch(error => {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again.');
        });
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading post...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;
  if (!post) return <p className="text-center text-gray-500">Post not found.</p>;

  return (
    <div>
      {/* Post Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 italic mb-6">
        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Post Content */}
      <div className="prose max-w-none text-gray-800 text-lg whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Action Buttons (Level 2 Requirement) */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
        <Link
          to={`/edit/${id}`}
          className="inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Edit Post
        </Link>
        <button
          onClick={handleDelete}
          className="inline-block px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default SinglePostPage;