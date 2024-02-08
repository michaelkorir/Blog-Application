import React from 'react';
import { Card, Container } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Contact Us</Card.Title>
          <Card.Text>
            <p>Telephone: 0755 555 555</p>
            <p>Email: theblogspot@gmail.com</p>
            <p>Facebook: The_Blog_Spot</p>
            <p>Twitter: @theblogspot</p>
            <p>Instagram: THEBLOGSPOT</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactUs;