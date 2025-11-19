// frontend/src/pages/EditPostPage.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogForm from '../components/BlogForm.jsx'; // Importing the reusable form

function EditPostPage() {
  const [initialData, setInitialData] = useState(null); // State to hold the post's existing data
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetching the post's current data to populate in the form
  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then(response => {
        // Setting initial data for the form
        setInitialData({
          title: response.data.title,
          content: response.data.content,
          author: response.data.author,
        });
        setIsFetching(false);
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
        setError('Failed to fetch post data.');
        setIsFetching(false);
      });
  }, [id]);

  // 2. Updating Handler (passed to the form's onSubmit)
  const handleEditPost = (formData) => {
    setIsLoading(true);

    // Feature: CRUD integration (Update)
    axios.put(`/blogs/${id}`, formData)
      .then(response => {
        setIsLoading(false);

        alert('Post updated successfully!');
        // On success, navigate to the updated post's page
        navigate(`/post/${response.data.id}`);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
      });
  };

  if (isFetching) return <p className="text-center text-gray-500">Loading post data...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b">
        Edit Post
      </h1>
      
      {/* Render the form ONLY when we have the initialData.
        Pass the existing data and the submit handler to the reusable form.
      */}
      {initialData && (
        <BlogForm
          onSubmit={handleEditPost}
          initialData={initialData}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default EditPostPage;