// frontend/src/pages/CreatePostPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogForm from '../components/BlogForm.jsx'; // Import the reusable form

function CreatePostPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // This function is passed to BlogForm as the 'onSubmit' prop
  const handleCreatePost = (formData) => {
    setIsLoading(true);
    
    // Feature: CRUD integration (Create)
    axios.post('/blogs', formData)
      .then(response => {
        setIsLoading(false);
        // On success, navigate to the new post's page
        navigate(`/post/${response.data.id}`);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b">
        Create New Post
      </h1>
      
      {/* This is the key part: 
        We are rendering the reusable BlogForm component 
        and telling it what to do when submitted.
      */}
      <BlogForm 
        onSubmit={handleCreatePost} 
        isLoading={isLoading} 
      />
    </div>
  );
}

export default CreatePostPage;