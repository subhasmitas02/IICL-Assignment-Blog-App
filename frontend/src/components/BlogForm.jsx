// frontend/src/components/BlogForm.jsx

import { useState, useEffect } from 'react';

// This form is reusable for both Create and Edit
// initialData will be empty for 'Create' and populated for 'Edit'
function BlogForm({ onSubmit, initialData = { title: '', content: '', author: '' }, isLoading = false }) {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState('');

  // Sync form data if initialData changes (for edit page)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Feature: Form controls
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Feature: Basic validation (Level 2 Requirement)
    if (!formData.title || !formData.content || !formData.author) {
      setError('All fields are required.');
      return;
    }
    setError('');

    // Pass the valid data up to the parent page (CreatePostPage or EditPostPage)
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Author Field */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="10"
          value={formData.content}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Submitting...' : 'Submit Post'}
        </button>
      </div>
    </form>
  );
}

export default BlogForm;