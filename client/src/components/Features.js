import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const FeaturesPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    return (
        <div>
            <h2>Features</h2>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/blogs">View Blogs</Link></li>
                        <li><Link to="/create">Create Blog</Link></li>
                        {/* Add other routes as needed */}
                    </ul>
                </nav>
                <Route path="/blogs" render={() => <BlogList blogs={blogs} />} />
                <Route path="/create" component={BlogForm} />
                {/* Add other routes as needed */}
            </Router>
        </div>
    );
};

export default FeaturesPage;
