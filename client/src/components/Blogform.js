import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, category })
        })
        .then(response => {
            if (response.ok) {
                history.push('/blogs');
            } else {
                return response.json().then(data => Promise.reject(data));
            }
        })
        .catch(error => console.error('Error creating blog:', error));
    };

    return (
        <div>
            <h3>Create Blog</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="international">International News</option>
                        <option value="sports">Sports News</option>
                        <option value="celebrity">Celebrity News</option>
                        <option value="lifestyle">Lifestyle Blogs</option>
                        <option value="politics">Politics Blogs</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BlogForm;
