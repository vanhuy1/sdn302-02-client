import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  viewProfile,
  selectUserProfile,
  selectLoading,
} from "../../store/profileSlice";
import NavProfile from "./NavProfile";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = useSelector(selectUserProfile);
    const isLoading = useSelector(selectLoading);

    useEffect(() => {
      dispatch(viewProfile());
    }, [dispatch]);
    
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
            <NavProfile />
            <div className="mt-5 mx-2 py-4 border rounded">
              <h3 className="ms-4 fw-bold">My Profile</h3>
              {isLoading && <p className="ms-4">Loading profile...</p>}
              {userProfile && (
                <div className="ms-4 mt-4">
                  <p>
                    <strong className="col-2">Full Name:</strong> {userProfile.name}
                  </p>
                  <p>
                    <strong>Username:</strong> {userProfile.username}
                  </p>
                  <p>
                    <strong>Gender:</strong> {userProfile.gender}
                  </p>
                  <p>
                    <strong>Birthday:</strong> {formatDate(userProfile.birthDay)}
                  </p>
                  <p>
                    <strong>Address:</strong> {userProfile.address}
                  </p>
                  <p>
                    <strong>Identity Number:</strong> {userProfile.identifyNumber}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {userProfile.phoneNumber}
                  </p>
                  <div>
                    <Button className="me-2 btn btn-warning" onClick={() => navigate("/dash/profile/update")}>
                    Edit
                    </Button>
                    <Button className="btn btn-primary" onClick={() => navigate(-1)}>
                    Back
                    </Button>
                  </div>
                </div>
              )}
            </div>
      </>
    );
};

export default Profile;
