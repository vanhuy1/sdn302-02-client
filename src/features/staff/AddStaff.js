import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Image, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/images/logo192.png";
import Swal from "sweetalert2";

import {
  getStaffById,
  selectStaffDetail,
  selectLoading,
  addStaff,
  updateStaff,
  selectErrorMessage,
} from "../../store/staffSlice";
import {
  selectAllDepartments,
  getAllDepartments,
} from "../../store/departmentSlice";

const AddStaff = () => {
  const [staffName, setStaffName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [image, setImage] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [active, setActive] = useState(true);
  const [formMode, setFormMode] = useState("add");

  const errorMessage = useSelector(selectErrorMessage);

  const errors = {
    staffName: "Staff name is required",
    gender: "Gender is required",
    identityNumber:
      "Identity number is required and must contain at least 12 numbers",
    position: "Position is required",
    salary: "Salary is required",
    phoneNumber:
      "Phone number is required and must contain at least 10 numbers",
    departmentID: "Department is required",
    email: "Please input a valid Outlook or Gmail address",
    birthday: "Birthday is required",
  };

  const renderErrorMessage = (name) =>
    errorMessages[name] && (
      <p className="text-danger mb-3">{errorMessages[name]}</p>
    );

  const { id } = useParams();
  const dispatch = useDispatch();
  const staffDetail = useSelector(selectStaffDetail);
  const isLoading = useSelector(selectLoading);
  const departments = useSelector(selectAllDepartments);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});

    const data = {
      staffName,
      gender,
      birthday,
      address,
      identityNumber,
      position,
      salary,
      email,
      phoneNumber,
      departmentID,
      active,
      imagePath: "",
    };

    // Validate input
    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      if (!data[key] && key !== "email" && key !== "image") {
        newErrors[key] = errors[key];
      }
    });

    // Email validation for Outlook and Gmail
    if (email && !validateEmail(email)) {
      newErrors.email = errors.email;
    }

    if (identityNumber && !validateIdentityNumber(identityNumber)) {
      newErrors.identityNumber =
        "Identity number must contain at least 12 numbers";
    }

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain at least 10 numbers";
    }

    if (birthday && !validateDate(birthday)) {
      newErrors.birthday = errors.birthday;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    if (image) {
      const formData = new FormData();
      formData.append("staffImage", image);
      formData.append("data", JSON.stringify(data));

      const imagePath = await uploadImage(formData);
      data.imagePath = imagePath;
    }

    const action =
      id !== "add"
        ? updateStaff({ _id: id, updatedData: data })
        : addStaff({ staffData: data });

    try {
      await dispatch(action).unwrap();
      const successMessage =
        id !== "add"
          ? "Staff updated successfully!"
          : "Staff added successfully!";
      Swal.fire({
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      resetFormState();
      navigate("/dash/manage/staff");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "There was a problem saving the staff.",
      });
    }
  };

  const validateEmail = (email) => {
    const regex = /^(?!.*@.*@)([a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com))$/;
    return regex.test(email);
  };

  const validateIdentityNumber = (identityNumber) => {
    const regex = /^\d{12,}$/;
    return regex.test(identityNumber);
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^\d{10,}$/;
    return regex.test(phone);
  };

  const validateDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const resetFormState = () => {
    setStaffName("");
    setGender("");
    setBirthday("");
    setAddress("");
    setIdentityNumber("");
    setPosition("");
    setSalary(0);
    setEmail("");
    setPhoneNumber("");
    setDepartmentID("");
    setActive(true);
    setImage("");
    setErrorMessages({});
  };

  useEffect(() => {
    if (id !== "add") {
      setFormMode("edit");
      dispatch(getStaffById({ _id: id }));
      dispatch(getAllDepartments());
    } else {
      setFormMode("add");
      resetFormState();
      dispatch(getAllDepartments());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== "add" && staffDetail) {
      setStaffName(staffDetail.staffName);
      setGender(staffDetail.gender);
      setBirthday(formatDate(staffDetail.birthday) || "");
      setAddress(staffDetail.address);
      setIdentityNumber(staffDetail.identityNumber);
      setPosition(staffDetail.position);
      setSalary(staffDetail.salary || 0);
      setEmail(staffDetail.email);
      setPhoneNumber(staffDetail.phoneNumber);
      setDepartmentID(staffDetail.departmentID || "");
      setActive(staffDetail.active);
      setImage(staffDetail.image || "");
    }
  }, [staffDetail, id]);

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
        <h3 className="text-center">
          {id === "add" ? "Add Staff" : "Update Staff"}
        </h3>
        {isLoading && <p className="text-center">Loading staff details...</p>}
        {errorMessage && (
          <p className="text-center text-danger mt-3">{errorMessage}</p>
        )}
        <Row className="mt-4">
          <Col md={3} className="mx-4 text-center">
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                rounded
                className="border"
                width="200"
                height="200"
              />
            ) : (
              <Image
                src={Logo}
                rounded
                className="border"
                width="200"
                height="200"
              />
            )}
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="name">
                Staff Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="name"
                className={errorMessages.staffName ? "" : "mb-3"}
                name="staffName"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Staff name..."
              />
              {renderErrorMessage("staffName")}
              <Form.Label htmlFor="gender">
                Gender <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="gender"
                className={errorMessages.gender ? "" : "mb-3"}
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Choose a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              {renderErrorMessage("gender")}
              <Form.Label htmlFor="birthday">Birthday</Form.Label>
              <Form.Control
                id="birthday"
                className="mb-3"
                type="date"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Select birthday"
              />
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                id="address"
                className="mb-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
              <Form.Label htmlFor="identityNumber">
                Identity Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="identityNumber"
                className={errorMessages.identityNumber ? "" : "mb-3"}
                name="identityNumber"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                placeholder="Enter identity number"
              />
              {renderErrorMessage("identityNumber")}
              <Form.Label htmlFor="position">
                Position <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="position"
                className={errorMessages.position ? "" : "mb-3"}
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
              />
              {renderErrorMessage("position")}
              <Form.Label htmlFor="salary">
                Salary <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="salary"
                className={errorMessages.salary ? "" : "mb-3"}
                type="number"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter salary"
              />
              {renderErrorMessage("salary")}
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                className={errorMessages.email ? "" : "mb-3"}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email (e.g., user@gmail.com)"
              />
              {renderErrorMessage("email")}
              <Form.Label htmlFor="phoneNumber">
                Phone Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                id="phoneNumber"
                className={errorMessages.phoneNumber ? "" : "mb-3"}
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number (10 digits)"
              />
              {renderErrorMessage("phoneNumber")}
              <Form.Label htmlFor="departmentID">
                Department <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                id="departmentID"
                className={errorMessages.departmentID ? "" : "mb-3"}
                name="departmentID"
                value={departmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
              >
                <option value="">Choose a department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.departmentName}
                  </option>
                ))}
              </Form.Select>
              {renderErrorMessage("departmentID")}
              <Form.Label htmlFor="active">Status</Form.Label>
              <Form.Select
                id="active"
                className="mb-3"
                name="active"
                value={active}
                onChange={(e) => setActive(e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
              <Form.Label htmlFor="image">Upload Image</Form.Label>
              <Form.Control
                id="image"
                type="file"
                accept="image/"
                onChange={handleImageChange}
                className={errorMessages.image ? "" : "mb-3"}
              />
              <div className="text-center">
                <Button variant="success me-2" className="mt-3" type="submit">
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
        </Row>
      </div>
    </>
  );
};

const uploadImage = async (formData) => {
  console.log(formData.get("staffImage").name);
  const fakePath = "/assets/images/staffs/" + formData.get("staffImage").name;
  return fakePath;
};

export default AddStaff;
