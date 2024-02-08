import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Navbar.Brand href="/home">Blogspot</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/users">Users</Nav.Link>
      <Nav.Link href="/blogs">Blogs</Nav.Link>
      <Nav.Link href="/comments">Comments</Nav.Link>
      <Nav.Link href="/about">About Us</Nav.Link>
      <Nav.Link href="/contacts">Contact Us</Nav.Link>
    </Nav>
  </Navbar>
);
export default NavBar;