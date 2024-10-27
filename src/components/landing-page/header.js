import React from "react";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useEffect } from "react";
import Logo from "../../assets/images/logo192.png";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { username, isManager } = useAuth();

  const navigate = useNavigate();

  const [sendLogout, { isSuccess }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

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
            <Nav.Link href="/dash">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/dash/services">Services</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          {username ? (
            <>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="m-0 me-2 fw-bolder">{username}</p>
                <div className="dropdown">
                  <Image
                    id="avatar"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    src={Logo}
                    roundedCircle
                    className="border dropdown-toggle"
                    width="40"
                    height="40"
                    alt="User Avatar"
                  />
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="avatar"
                  >
                    <li>
                      <Link className="dropdown-item" to="/dash/profile">
                        Profile
                      </Link>
                    </li>
                    {isManager && (
                      <li>
                        <Link className="dropdown-item" to="/dash/manage/users">
                          Manage
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={sendLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          ) : (
            <>
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
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
