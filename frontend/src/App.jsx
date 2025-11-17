// frontend/src/App.jsx

import { Routes, Route, Link } from 'react-router-dom';

// Import your new page components
import BlogListPage from './pages/BlogListPage';
import SinglePostPage from './pages/SinglePostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <>
      {/* Simple Navigation Bar */}
      <nav style={{ padding: '1rem', backgroundColor: '#333' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
          IICL Assignment - Blog App
        </Link>
      </nav>

      {/* Main Content Area */}
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <Routes>
          {/* Page: Blog list view (Level 2) */}
          <Route path="/" element={<BlogListPage />} />

          {/* Page: View single post (Level 2) */}
          <Route path="/post/:id" element={<SinglePostPage />} />

          {/* Page: Create form (Level 2) */}
          <Route path="/create" element={<CreatePostPage />} />

          {/* Page: Edit form (Level 2) */}
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;