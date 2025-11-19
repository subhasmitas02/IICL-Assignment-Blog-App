// frontend/src/pages/BlogListPage.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// A simple reusable Button component
const Button = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {children}
      </Link>
    );
  }
  return (
    <button 
      {...props}
      className="inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
    >
      {children}
    </button>
  );
};

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // --- FILTER STATE (Input values) ---
  const [filterAuthor, setFilterAuthor] = useState("");
  // Use single date filter inputs
  const [filterCreatedAtDate, setFilterCreatedAtDate] = useState("");
  const [filterUpdatedAtDate, setFilterUpdatedAtDate] = useState("");

  // --- SEARCH STATE (Values used for fetching, triggers useEffect) ---
  const [searchTerm, setSearchTerm] = useState("");
  // Use single date search state
  const [searchCreatedAtDate, setSearchCreatedAtDate] = useState("");
  const [searchUpdatedAtDate, setSearchUpdatedAtDate] = useState("");

  useEffect(() => {
    setLoading(true);
    
    // Built the query URL with all active filters and pagination parameters
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('pageSize', 10);
    
    if (searchTerm) {
      params.append('author', searchTerm);
    }
    // Send new date filter parameters
    if (searchCreatedAtDate) {
      params.append('createdAtDate', searchCreatedAtDate);
    }
    if (searchUpdatedAtDate) {
      params.append('updatedAtDate', searchUpdatedAtDate);
    }
    
    
    axios.get(`/blogs?${params.toString()}`)
      .then(response => {
        setBlogs(response.data.data);
        // Save pagination metadata
        setTotalPages(response.data.meta.totalPages);
        setTotalPosts(response.data.meta.total);
        setCurrentPage(response.data.meta.page);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blog posts.');
        setLoading(false);
      });
  }, [currentPage, searchTerm, searchCreatedAtDate, searchUpdatedAtDate]); // Re-fetch on state changes

  // --- PAGINATION HANDLERS (Same as before) ---
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // --- FILTER HANDLERS ---
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 for any new filter action
    
    // Apply values from input state to search state to trigger useEffect
    setSearchTerm(filterAuthor);
    // MODIFIED: Map new date filter inputs to search state
    setSearchCreatedAtDate(filterCreatedAtDate);
    setSearchUpdatedAtDate(filterUpdatedAtDate);
    // END MODIFICATION
  };
  
  const clearFilter = () => {
    // Reset all filter input fields
    setFilterAuthor("");
    // MODIFIED: Reset new date filter inputs
    setFilterCreatedAtDate("");
    setFilterUpdatedAtDate("");
    // END MODIFICATION

    // Reset all search state to trigger a full re-fetch of unfiltered data
    setSearchTerm("");
    // MODIFIED: Reset new date search state
    setSearchCreatedAtDate("");
    setSearchUpdatedAtDate("");
    // END MODIFICATION
    setCurrentPage(1);
  }

  if (loading && blogs.length === 0) return <p className="text-center text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;
  
  // Check if any filter is active for custom message logic
  const isFilterActive = searchTerm || searchCreatedAtDate || searchUpdatedAtDate;
  
  // MODIFIED: Logic for "Currently no Posts, Why not create one?" message
  if (blogs.length === 0 && !loading && !isFilterActive) {
      return (
        <div>
           <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
             <h1 className="text-3xl font-bold text-gray-900">Dashboard / All Blog Posts</h1>
           </div>
           
           {/* Render filter form so user can still interact */}
           <form onSubmit={handleFilterSubmit} className="mb-6 space-y-2">
             <div className="flex space-x-2">
               <input
                 type="text"
                 placeholder="Filter by author..."
                 value={filterAuthor}
                 onChange={(e) => setFilterAuthor(e.target.value)}
                 className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500 text-black"
               />
             </div>
     
             <div className="flex space-x-4 items-center">
               <label htmlFor="createdAtDate" className="text-sm font-medium text-gray-700 whitespace-nowrap">Created At Date:</label>
               <input
                 id="createdAtDate"
                 type="date"
                 value={filterCreatedAtDate}
                 onChange={(e) => setFilterCreatedAtDate(e.target.value)}
                 className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500 text-black"
               />
               <label htmlFor="updatedAtDate" className="text-sm font-medium text-gray-700 whitespace-nowrap">Updated At Date:</label>
               <input
                 id="updatedAtDate"
                 type="date"
                 value={filterUpdatedAtDate}
                 onChange={(e) => setFilterUpdatedAtDate(e.target.value)}
                 className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500 text-black"
               />
             </div>
     
             <div className="pt-2 flex space-x-2">
               <Button type="submit" className="w-1/2">Apply Filters</Button>
               <Button type="button" onClick={clearFilter} className="w-1/2 bg-gray-500 hover:bg-gray-600">
                 Clear Filters
               </Button>
             </div>
           </form>
           
          <div className="text-center p-10 border border-dashed border-gray-400 rounded-lg bg-gray-50">
            <p className="text-xl font-semibold text-gray-700">Currently no Posts, Why not create one?</p>
            <Link 
              to="/create" 
              className="mt-4 inline-block px-6 py-3 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Create New Post
            </Link>
          </div>
        </div>
      )
  }
  // END MODIFIED

  return (
    <div>
      {/* Header --- MODIFIED: Update title to reflect Dashboard/HomePage role --- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard / All Blog Posts</h1>
        {/* Note: The main 'Create New Post' button is in App.jsx navigation */}
      </div>

      {/* --- FILTER FORM --- MODIFIED: Updated input fields for specific dates --- */}
      <form onSubmit={handleFilterSubmit} className="mb-6 space-y-2">
        {/* Author Filter Row */}
        <div className="flex space-x-4 items-center">
          <label htmlFor="author" className="text-sm font-medium text-gray-700 whitespace-nowrap">Author:</label>
          <input
            type="text"
            placeholder="Filter by author..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500 text-black"
          />
        </div>

        {/* Date Filter Row */}
        <div className="flex space-x-4 items-center">
          {/* Created At Date Filter */}
          <label htmlFor="createdAtDate" className="text-sm font-medium text-gray-700 whitespace-nowrap">Created At Date:</label>
          <input
            id="createdAtDate"
            type="date"
            value={filterCreatedAtDate}
            onChange={(e) => setFilterCreatedAtDate(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500 text-black"
          />
          {/* Updated At Date Filter */}
          <label htmlFor="updatedAtDate" className="text-sm font-medium text-gray-700 whitespace-nowrap">Updated At Date:</label>
          <input
            id="updatedAtDate"
            type="date"
            value={filterUpdatedAtDate}
            onChange={(e) => setFilterUpdatedAtDate(e.target.value)}
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-blue-500 text-black"
          />
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 flex space-x-2">
          <Button type="submit" className="w-1/2">Apply Filters</Button>
          <Button type="button" onClick={clearFilter} className="w-1/2 bg-gray-500 hover:bg-gray-600">
            Clear Filters
          </Button>
        </div>
      </form>
      {/* --- END FILTER FORM MODIFICATION --- */}

      {/* Blog Post List */}
      {blogs.length === 0 && !loading ? (
        // MODIFIED: Message for when filters return no results
        <p className="text-gray-600">No posts found {isFilterActive ? "matching your filters" : ""}.</p>
      ) : (
        <div className="space-y-5">
          {blogs.map(blog => (
            <div key={blog.id} className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-2xl font-semibold text-blue-700 hover:text-blue-800">
                <Link to={`/post/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              {/* MODIFIED: Display both dates */}
              <p className="text-sm text-gray-500 italic mt-1">
                by {blog.author} - Created: {new Date(blog.createdAt).toLocaleDateString()} - Updated: {new Date(blog.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* --- PAGINATION CONTROLS (Same as before) --- */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={handlePrevPage} disabled={currentPage <= 1 || loading}>
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages} (Total Posts: {totalPosts})
        </span>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages || loading}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default BlogListPage;