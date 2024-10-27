import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaBook,
  FaCog,
  FaConciergeBell,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { isManager } = useAuth();
  const location = useLocation();

  const isSidebarActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const sidebarManagePaths = [
    "/dash/manage/staff",
    "/dash/manage/room",
    "/dash/manage/service",
    "/dash/manage/users",
  ];

  const sidebarUserPaths = [
    "/dash/profile",
    "/dash/profile/update",
    "/dash/profile/change-password",
  ];

  return (
    <Nav className="flex-column bg-light vh-100 border-top border-bottom">
      <Link
        className={`d-flex align-items-center nav-item-custom rounded py-3 fs-6 text-decoration-none ${
          location.pathname === "/dash" ? "bg-primary text-white" : "text-dark"
        }`}
        to="/dash"
      >
        <FaHome className="me-3 ms-4 fs-5" /> Home
      </Link>
      <Link
        className={`d-flex align-items-center nav-item-custom rounded py-3 fs-6 text-decoration-none ${
          location.pathname === "/dash/booking"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        to="/dash/booking"
      >
        <FaBook className="me-3 ms-4 fs-5" /> Booking
      </Link>
      <Link
        className={`d-flex align-items-center nav-item-custom rounded py-3 fs-6 text-decoration-none ${
          location.pathname === "/dash/services"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        to="/dash/services"
      >
        <FaConciergeBell className="me-3 ms-4 fs-5" /> Services
      </Link>

      {isManager && (
        <Link
          className={`d-flex align-items-center nav-item-custom rounded py-3 fs-6 text-decoration-none ${
            isSidebarActive(sidebarManagePaths)
              ? "bg-primary text-white"
              : "text-dark"
          }`}
          to="/dash/manage/users"
        >
          <FaCog className="me-3 ms-4 fs-5" /> Manage
        </Link>
      )}

      <Link
        className={`d-flex align-items-center nav-item-custom rounded py-3 fs-6 text-decoration-none ${
          location.pathname === "/dash/bill"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        to="/dash/bill"
      >
        <FaClipboardList className="me-3 ms-4 fs-5" /> Bill
      </Link>

      <Link
        className={`d-flex align-items-center nav-item-custom rounded py-3 fs-6 text-decoration-none ${
          isSidebarActive(sidebarUserPaths)
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        to="/dash/profile"
      >
        <FaUser className="me-3 ms-4 fs-5" /> User
      </Link>
    </Nav>
  );
};

export default Sidebar;
