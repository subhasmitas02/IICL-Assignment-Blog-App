// frontend/src/App.jsx

import { Routes, Route, Link } from 'react-router-dom';
import BlogListPage from './pages/BlogListPage';
import SinglePostPage from './pages/SinglePostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Site Title / Brand Link (Also leads to Dashboard) */}
          <Link to="/" className="text-xl font-bold text-white">
            IICL Assignment - Blog App
          </Link>

          {/* Action Buttons Container */}
          <div className="space-x-4">
            {/* NEW: Explicit Dashboard Button - Just added for better view */}
            <Link 
              to="/" 
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Dashboard
            </Link>
            
            {/* Existing: Create Post Button */}
            <Link 
              to="/create" 
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create New Post
            </Link>
          </div>

        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-lg">
        <Routes>
          {/* Page: Blog list view */}
          <Route path="/" element={<BlogListPage />} />

          {/* Page: View single post */}
          <Route path="/post/:id" element={<SinglePostPage />} />

          {/* Page: Create form */}
          <Route path="/create" element={<CreatePostPage />} />

          {/* Page: Edit form */}
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;