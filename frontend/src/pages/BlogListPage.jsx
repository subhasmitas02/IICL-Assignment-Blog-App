// frontend/src/pages/BlogListPage.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// A simple reusable Button component
const Button = ({ to, children }) => (
  <Link 
    to={to} 
    className="inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    {children}
  </Link>
);

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/blogs')
      .then(response => {
        setBlogs(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blog posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">All Blog Posts</h1>
        <Button to="/create">
          Create New Post
        </Button>
      </div>

      {/* Blog Post List */}
      {blogs.length === 0 ? (
        <p className="text-gray-600">No posts found. Why not create one?</p>
      ) : (
        <div className="space-y-5">
          {blogs.map(blog => (
            <div key={blog.id} className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-semibold text-blue-700 hover:text-blue-800">
                <Link to={`/post/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 italic mt-1">by {blog.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogListPage;