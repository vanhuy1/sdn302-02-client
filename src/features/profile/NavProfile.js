import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const NavProfile = () => {
  const { pathname } = useLocation();

  const isActive = (path) => {
    return pathname.startsWith(path);
  };

  return (
    <Nav variant="tabs">
      <Nav.Item>
        <NavLink
          to="/dash/profile"
          className={isActive("/dash/profile") ? "active nav-link" : "nav-link"}
        >
          Profile
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/dash/profile/update"
          className={
            isActive("/dash/profile/update") ? "active nav-link" : "nav-link"
          }
        >
          Edit Profile
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/dash/profile/change-password"
          className={
            isActive("/dash/profile/change-password")
              ? "active nav-link"
              : "nav-link"
          }
        >
          Change Password
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default NavProfile;
