// frontend/src/App.jsx

import { Routes, Route, Link } from 'react-router-dom';

// Import your page components
import BlogListPage from './pages/BlogListPage';
import SinglePostPage from './pages/SinglePostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="text-xl font-bold text-white">
            IICL Assignment - Blog App
          </Link>
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