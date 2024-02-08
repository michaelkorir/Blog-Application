import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBars = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Blogspot</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#blogs">Blogs</Nav.Link>
      <Nav.Link href="#users">Users</Nav.Link>
      <Nav.Link href="#aboutus">About Us</Nav.Link>
      <Nav.Link href="#comments">Comments</Nav.Link>
      <Nav.Link href="#contactus">Contact Us</Nav.Link>
    </Nav>
  </Navbar>
);
export default NavBars;