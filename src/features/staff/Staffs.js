import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  selectLoading,
  selectAllStaffs,
  getAllStaffs,
  deleteStaff,
} from "../../store/staffSlice";

const Staffs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const staffs = useSelector(selectAllStaffs);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("staffName");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("staffName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStaff({ _id: id }))
          .then(() => {
            Swal.fire("Deleted!", "The staff has been deleted.", "success");
            dispatch(getAllStaffs());
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was a problem deleting the staff.",
              "error"
            );
          });
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    const newSortField = e.target.value;
    if (newSortField === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(newSortField);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    dispatch(getAllStaffs());
  }, [dispatch]);

  const filteredStaffs = staffs.filter((staff) => {
    const matchesSearch =
      (searchField === "staffName" &&
        staff.staffName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchField === "gender" &&
        staff.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchField === "identityNumber" &&
        staff.identityNumber.toString().includes(searchTerm.toLowerCase())) ||
      (searchField === "position" &&
        staff.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchField === "phoneNumber" &&
        staff.phoneNumber.toString().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && staff.active) ||
      (filterStatus === "inactive" && !staff.active);

    return matchesSearch && matchesFilter;
  });

  const sortedStaffs = [...filteredStaffs].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedStaffs.length / 5);
  const indexOfLastStaff = currentPage * 5;
  const indexOfFirstStaff = indexOfLastStaff - 5;
  const currentStaffs = sortedStaffs.slice(indexOfFirstStaff, indexOfLastStaff);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="mx-2 border rounded">
        <h2 className="text-center mt-3 mb-3">Staffs</h2>
        {isLoading && <p className="ms-4">Loading staff data...</p>}

        {/* Search and Filter */}
        <div className="mx-4 mb-3">
          <Row>
            <Col md={12} xs={12}>
              <Form.Label className="fw-bold m-0 mt-2 mb-sm-2" htmlFor="search">
                Search:
              </Form.Label>
            </Col>
            <Col md={8} xs={8}>
              <Form.Control
                id="search"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={4} xs={4}>
              <Form.Select
                value={searchField}
                onChange={handleFieldChange}
                className="me-2"
              >
                <option value="staffName">Staff Name</option>
                <option value="gender">Gender</option>
                <option value="identityNumber">Identity Number</option>
                <option value="position">Position</option>
                <option value="phoneNumber">Phone Number</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
        <div className="mx-4 d-flex justify-content-between align-items-center mb-3">
          <Form.Label className="fw-bold m-0 me-2" htmlFor="filter">
            Filter:
          </Form.Label>
          <Form.Select
            id="filter"
            className="me-5"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
          <Form.Label className="fw-bold m-0 me-2" htmlFor="sort">
            Sort:
          </Form.Label>
          <Form.Select
            id="sort"
            value={sortField}
            onChange={handleSortFieldChange}
            className="me-2"
          >
            <option value="staffName">Sort by Staff Name</option>
            <option value="gender">Sort by Gender</option>
            <option value="identityNumber">Sort by Identity Number</option>
            <option value="position">Sort by Position</option>
            <option value="phoneNumber">Sort by Phone Number</option>
          </Form.Select>
          <Button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? (
              <FaArrowUpShortWide />
            ) : (
              <FaArrowDownWideShort />
            )}
          </Button>
        </div>

        <Table striped bordered hover responsive className="mx-4">
          <thead>
            <tr>
              <th></th>
              <th>Staff Name</th>
              <th>Gender</th>
              <th>Identity Number</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStaffs.length > 0 ? (
              currentStaffs.map((staff, index) => (
                <tr key={staff._id}>
                  <td>{index + 1 + (currentPage - 1) * 5}</td>
                  <td>{staff.staffName}</td>
                  <td>{staff.gender}</td>
                  <td>{staff.identityNumber}</td>
                  <td>{staff.position}</td>
                  <td>{staff.phoneNumber}</td>
                  <td>
                    {staff.active ? (
                      <span className="text-success fw-bolder">Working</span>
                    ) : (
                      <span className="text-danger fw-bolder">Left</span>
                    )}
                  </td>
                  <td>
                    <Link className="btn btn-info me-1" to={`${staff._id}`}>
                      <FaInfoCircle className="m-0 fs-5" />
                    </Link>
                    <Link
                      className="btn btn-warning me-1"
                      to={`update/${staff._id}`}
                    >
                      <FaEdit className="m-0 fs-5" />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={(e) => handleDelete(e, staff._id)}
                    >
                      <FaTrash className="m-0 fs-5" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {/* Pagination Controls */}
        <div className="d-flex justify-content-between mx-4 my-3">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        <div className="ms-4 my-3">
          <Link className="btn btn-warning" to="update/add">
            Add
          </Link>
        </div>
      </div>
    </>
  );
};

export default Staffs;
