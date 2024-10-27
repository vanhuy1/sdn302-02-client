import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import {
  getStaffById,
  selectStaffDetail,
  selectLoading,
  deleteStaff,
} from "../../store/staffSlice";
import Swal from "sweetalert2"; // Import SweetAlert2 for deletion confirmation

const StaffDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staffDetail = useSelector(selectStaffDetail);
  const isLoading = useSelector(selectLoading);

  const handleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStaff({ _id: id })).then(() => {
          Swal.fire(
            'Deleted!',
            'The staff has been deleted.',
            'success'
          );
          navigate("/dash/manage/staff");
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was a problem deleting the staff.',
            'error'
          );
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getStaffById({ _id: id }));
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="mt-5 mx-2 py-4 border rounded">
        <h3 className="ms-4">Staff Details</h3>
        {isLoading && <p className="ms-4">Loading staff details...</p>}
        {staffDetail && (
          <div className="ms-4 mt-3">
            <p>
              <strong>Name:</strong> {staffDetail.staffName}
            </p>
            <p>
              <strong>Gender:</strong> {staffDetail.gender}
            </p>
            <p>
              <strong>Birthday:</strong> {formatDate(staffDetail.birthday)}
            </p>
            <p>
              <strong>Address:</strong> {staffDetail.address}
            </p>
            <p>
              <strong>Identity Number:</strong> {staffDetail.identityNumber}
            </p>
            <p>
              <strong>Position:</strong> {staffDetail.position}
            </p>
            <p>
              <strong>Salary:</strong> {staffDetail.salary}
            </p>
            <p>
              <strong>Email:</strong> {staffDetail.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {staffDetail.phoneNumber}
            </p>
            <p>
              {staffDetail.active ? (
                <span className="fw-bold text-success">
                  Staff is currently working
                </span>
              ) : (
                <span className="fw-bold text-danger">Staff has left</span>
              )}
            </p>
            <div>
              <Button
                className="me-2"
                variant="warning"
                onClick={() => navigate(`/dash/manage/staff/update/${staffDetail._id}`)}
              >
                Edit
              </Button>
              <Button
                className="me-2"
                variant="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/dash/manage/staff")}
              >
                Back to Staff List
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StaffDetail;