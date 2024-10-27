import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navtab = () => {
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <NavLink
          to="/dash/manage/staff"
          className={({ isActive }) =>
            isActive ? "active nav-link" : "nav-link"
          }
        >
          Staff
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/dash/manage/room"
          className={({ isActive }) =>
            isActive ? "active nav-link" : "nav-link"
          }
        >
          Room
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/dash/manage/service"
          className={({ isActive }) =>
            isActive ? "active nav-link" : "nav-link"
          }
        >
          Service
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/dash/manage/users"
          className={({ isActive }) =>
            isActive ? "active nav-link" : "nav-link"
          }
        >
          Customer
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default Navtab;
