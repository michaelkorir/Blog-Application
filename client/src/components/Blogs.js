import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from backend
    fetch('/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data.map(blog => ({ ...blog, likes: 0, dislikes: 0 }))));
  }, []);

  const handleLike = (id) => {
    // Handle like 
    setBlogs(prevBlogs => prevBlogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, likes: blog.likes + 1 };
      }
      return blog;
    }));
  };

  const handleDislike = (id) => {
    // Handle dislike 
    setBlogs(prevBlogs => prevBlogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, dislikes: blog.dislikes - 1 };
      }
      return blog;
    }));
  };

  return (
    <div className="d-flex flex-wrap">
      {blogs.map(blog => (
        <Card key={blog.id} style={{ width: '18rem' }} className="m-2" bg="light" text="dark">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>
            <Button
              onClick={() => handleLike(blog.id)}
              variant={blog.isLiked ? 'success' : 'light'}
              className="mr-2">
              <FontAwesomeIcon icon={faThumbsUp} /> {blog.likes}
            </Button>
            <Button
              onClick={() => handleDislike(blog.id)}
              variant={blog.isDisliked ? 'danger' : 'light'}>
              <FontAwesomeIcon icon={faThumbsDown} /> {blog.dislikes}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Blogs;