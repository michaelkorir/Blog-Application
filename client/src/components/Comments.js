import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch comments from backend and set them to state
    fetch('/comments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        return response.json();
      })
      .then(data => {
        setComments(data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {isLoading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        comments.map(comment => (
          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>{comment.id}</Card.Title>
              <Card.Text>{comment.Comments}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Comments;