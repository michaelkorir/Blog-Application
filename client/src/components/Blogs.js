import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from backend and set them to state
    fetch('/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {blogs.map(blog => (
        <Card style={{ width: '18rem' }} className="m-2">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Blogs;