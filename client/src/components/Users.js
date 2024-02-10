import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Container, Row, Col, Table } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users from backend and set them to state
    fetch('/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, data]);
      setUsername('');
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGetUserById = async () => {
    try {
      const response = await fetch(`/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const user = await response.json();
      setSelectedUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUserById = async () => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Remove the deleted user from the users state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setSelectedUser(null);
      
      // Refresh the page to reflect the updated user list
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditUsername = async () => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to update username');
      }
      // Update the username in the users state
      setUsers(prevUsers => prevUsers.map(user => {
        if (user.id === userId) {
          return { ...user, name: username };
        }
        return user;
      }));
      // Clear input fields
      setUserId('');
      setUsername('');
      setSelectedUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={5}>
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add User
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <Form.Group controlId="userId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              value={userId}
              onChange={event => setUserId(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleGetUserById} className="mr-2">
            Get User by ID
          </Button>
          <Button variant="danger" onClick={handleDeleteUserById}>
            Delete User by ID
          </Button>
          {selectedUser && (
            <Form onSubmit={handleEditUsername} className="mt-2">
              <Form.Group controlId="editName">
                <Form.Label>Edit Name</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                Edit Username
              </Button>
            </Form>
          )}
        </Col>
      </Row>
      {selectedUser && (
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>User Details</Card.Title>
                <Card.Text>ID: {selectedUser.id}</Card.Text>
                <Card.Text>Name: {selectedUser.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center mt-4">
        {isLoading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};

export default Users;
