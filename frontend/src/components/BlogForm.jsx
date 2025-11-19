// frontend/src/components/BlogForm.jsx

import { useState, useEffect } from 'react';

function BlogForm({ onSubmit, initialData = { title: '', content: '', author: '' }, isLoading = false }) {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
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
          className="mt-1 text-black  block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500" // <-- Updated
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
          className="mt-1 text-black  block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500" // <-- Updated
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
          className="mt-1 text-black  block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500"// <-- Updated
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