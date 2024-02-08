import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AboutUS'
import './ContactUs'

const HomePage = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setShowNav(true);
  }, []);

  return (
    <div>
      <header>
        <h1>WELCOME TO THE BLOGSPOT</h1>
      </header>
      {showNav && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Blogspot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/user">User</Nav.Link>
                <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
                <Nav.Link as={Link} to="/comment">Comment</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Welcome to the Blogspot</Card.Title>
                <Card.Text>
                  This is a blogging platform where you can create and manage your blogs, comments, and user profiles.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="footer">
        <Link to="/about" className="text-decoration-none text-white">About Us</Link>
        <br />
        <Link to="/contact" className="text-decoration-none text-white">Contact Us</Link>
      </div>
    </div>
  );
};

export default HomePage;
