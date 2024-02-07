// frontend/src/components/Features/BlogCard.js

import React from 'react';

const BlogCard = ({ blog }) => {
    return (
        <div className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Category: {blog.category}</p>
        </div>
    );
};

export default BlogCard;
