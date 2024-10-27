import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  viewProfile,
  editProfile,
  selectUserProfile,
  selectLoading,
} from "../../store/profileSlice";
import NavProfile from "./NavProfile";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [identifyNumber, setIdentifyNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    username: "Username is required",
    name: "Name is required",
    gender: "Gender is required",
    identifyNumber: "Identify number is required and must contain at least 12 numbers",
    phoneNumber: "Phone number is required and must contain at least 10 numbers",
    birthDay: "Birthday must be before today",
  };

  const renderErrorMessage = (name) =>
    errorMessages[name] && <p className="text-danger mb-3">{errorMessages[name]}</p>;

  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});

    const data = {
      username,
      name,
      gender,
      birthDay,
      address,
      identifyNumber,
      phoneNumber,
    };

    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = errors[key];
      }
    });

    if (identifyNumber && !validateIdentifyNumber(identifyNumber)) {
      newErrors.identifyNumber = "Identify number must contain at least 12 numbers";
    }

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain at least 10 numbers";
    }

    if (!validateBirthday(birthDay)) {
      newErrors.birthDay = "Birthday must be before today";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    try {
      const resultAction = await dispatch(editProfile({ updatedData: data }));
      if (editProfile.fulfilled.match(resultAction)) {
        setErrorMessages({});
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/dash/profile");
      } else {
        throw new Error(resultAction.error?.message || "Update failed. Please try again.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const validateIdentifyNumber = (identifyNumber) => {
    const regex = /^\d{12,}$/;
    return regex.test(identifyNumber);
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^\d{10,}$/;
    return regex.test(phone);
  };

  const validateBirthday = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    return selectedDate < today;
  };

  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username);
      setName(userProfile.name);
      setGender(userProfile.gender);
      setBirthday(formatDate(userProfile.birthDay) || "");
      setAddress(userProfile.address);
      setIdentifyNumber(userProfile.identifyNumber);
      setPhoneNumber(userProfile.phoneNumber);
    }
  }, [userProfile]);

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
        <h3 className="text-center">Update Profile</h3>
        {isLoading && <p className="text-center">Loading profile details...</p>}
        <Row className="mt-4">
          <Col md={3}></Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="username">
                Username <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="username"
                className={errorMessages.username ? "" : "mb-3"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
              {renderErrorMessage("username")}
              <Form.Label htmlFor="name">
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="name"
                className={errorMessages.name ? "" : "mb-3"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
              {renderErrorMessage("name")}
              <Form.Label htmlFor="gender">
                Gender <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="gender"
                className={errorMessages.gender ? "" : "mb-3"}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Choose a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              {renderErrorMessage("gender")}
              <Form.Label htmlFor="birthDay">Birthday</Form.Label>
              <Form.Control
                id="birthDay"
                className={errorMessages.birthDay ? "" : "mb-3"}
                type="date"
                value={birthDay}
                onChange={(e) => setBirthday(e.target.value)}
              />
              {renderErrorMessage("birthDay")}
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                id="address"
                className="mb-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
              <Form.Label htmlFor="identifyNumber">
                Identify Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="identifyNumber"
                className={errorMessages.identifyNumber ? "" : "mb-3"}
                value={identifyNumber}
                onChange={(e) => setIdentifyNumber(e.target.value)}
                placeholder="Enter identify number"
              />
              {renderErrorMessage("identifyNumber")}
              <Form.Label htmlFor="phoneNumber">
                Phone Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="phoneNumber"
                className={errorMessages.phoneNumber ? "" : "mb-3"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number (10 digits)"
              />
              {renderErrorMessage("phoneNumber")}
              <div className="text-center">
                <Button
                  variant="success me-2"
                  className="mt-3"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </div>
    </>
  );
};

export default UpdateProfile;
