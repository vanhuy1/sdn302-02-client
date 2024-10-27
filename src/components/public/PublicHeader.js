import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PublicHeader = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">
          <img
            src="https://img.freepik.com/premium-vector/hotel-icon-logo-vector-design-template_827767-3569.jpg"
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
            style={{ marginLeft: "30px" }}
          />{" "}
        </Navbar.Brand>

        <h2 style={{ marginLeft: "100px" }}> CODER HOTEL </h2>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          style={{ marginRight: "30px" }}
        >
          <Nav className="me-5">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/dash/services">Services</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-primary" className="me-2">
            <Link to="/register" style={{ textDecoration: "none" }}>
              {" "}
              Register
            </Link>
          </Button>
          <Button variant="outline-primary">
            <Link to="/login" style={{ textDecoration: "none" }}>
              {" "}
              Login
            </Link>
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default PublicHeader;
