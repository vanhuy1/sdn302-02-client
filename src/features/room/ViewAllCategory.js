import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Table, Button, Pagination, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, ViewRoomCategory, AddRoomCategory, UpdateRoomCategory, DeleteRoomCategory, ViewRoomCategoryById } from '../../features/room/RoomSlice'; // Adjust the import path based on your project structure

const ViewAllRooms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rooms, loading, error, roomCategories } = useSelector((state) => state.room);
    const [roomCategoryName, setRoomCategoryName] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [categoryRoomID, setCategoryRoomID] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    // Pagination handling
    const itemsPerPage = 5;
    const totalPages = Math.ceil(rooms.length / itemsPerPage);

    const handleViewRoom = () => {
        navigate('/dash/manage/room');
    };

    const handleViewCategory = () => {
        navigate('/dash/manage/category');
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        dispatch(ViewRoomCategory());
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleAddRoom = () => {
        dispatch(ViewRoomCategory());
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseModal2 = () => {
        setShowModal2(false);
    };

    const handleConfirm = ({ roomCategoryName, price, amount }) => {

        // Dispatch your action to create the room with these values
        dispatch(AddRoomCategory({ roomCategoryName, price, amount }))
            .unwrap()
            .then((result) => {
                if (AddRoomCategory.fulfilled.match(result)) {
                    alert("Add success");
                    window.location.reload();
                } else if (AddRoomCategory.rejected.match(result)) {
                    alert("Failed to add room: " + result.error.message);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error("Add error:", error);
                alert("Something went wrong: " + error.message);
                window.location.reload();
            });

        handleCloseModal();
    };

    const handleConfirmEdit = ({ roomCategoryName, price, amount, categoryRoomID }) => {


        dispatch(UpdateRoomCategory({ roomCategoryName, price, amount, categoryRoomID }))
            .unwrap()
            .then((result) => {
                console.log(UpdateRoomCategory.fulfilled.match(result))
                if (UpdateRoomCategory.fulfilled.match(result)) {
                    alert("Edit success");
                    window.location.reload();
                } else if (UpdateRoomCategory.rejected.match(result)) {
                    alert("Failed to edit room: " + result.error.message);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error("Edit error:", error);
                alert("Something went wrong: " + error.message);
                window.location.reload();
            });

        handleCloseModal2();
    };



    const handleDelete = (categoryRoomId) => {
        console.log("Deleting room with ID:", typeof categoryRoomId);
        dispatch(DeleteRoomCategory({ categoryRoomId: categoryRoomId }))
            .then((result) => {
                if (DeleteRoomCategory.fulfilled.match(result)) {
                    alert("Delete done");
                    window.location.reload();
                } else if (DeleteRoomCategory.rejected.match(result)) {
                    alert("Failed to delete room: " + result.error.message);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error("Delete error:", error);
                alert("Something went wrong: " + error.message);
                window.location.reload();
            });
    };

    const handleEdit = (categoryRoomId) => {
        console.log(categoryRoomId);
        dispatch(ViewRoomCategoryById(categoryRoomId)).then((result) => {
            if (ViewRoomCategoryById.fulfilled.match(result)) {
                const data = result.payload;

                console.log("Room Name:", data.roomCategoryName);
                console.log("Room Number:", data.price);
                console.log("Capacity:", data.amount);

                setCategoryRoomID(categoryRoomId);
                setRoomCategoryName(data.roomCategoryName);
                setPrice(data.price);
                setAmount(data.amount);
                setShowModal2(true);
            } else {
                console.error("Failed to fetch room category:", result.error.message);
                window.location.reload();
            }
        });
    };




    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Row>
                <Col md={10} className="mt-3 mb-5">
                    <p className="fs-4 fw-semibold">Manage</p>
                        <Row className="mb-3">
                            <Col>
                                <h5>Room management</h5>
                            </Col>
                            <Col className="text-end mt-4">
                                <Button onClick={() => handleAddRoom()} variant="outline-primary" className="me-2">Add new room</Button>
                                <Button onClick={handleViewCategory} variant="outline-primary" className="me-2">View room category</Button>
                                <Button onClick={handleViewRoom} variant="outline-primary" className="me-2">View room </Button>
                            </Col>
                        </Row>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Room name</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((room, index) => (
                                    <tr key={`${room._id}-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{room.roomCategoryName}</td>
                                        <td>{room.price}</td>
                                        <td>{room.amount}</td>
                                        <td>
                                            <Button onClick={() => handleDelete(room._id)} variant="outline-danger" className="me-2">Delete</Button>
                                            <Button onClick={() => handleEdit(room._id)} variant="outline-success" className="me-2">Edit</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>

                        {/* Pagination */}
                        <Pagination className="justify-content-center">
                            <Pagination.Prev
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                            />
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={idx + 1 === currentPage}
                                    onClick={() => handlePageChange(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                </Col>
            </Row>
            {/* Category Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Create New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form with 3 input fields */}
                    <form>
                        <div className="mb-3">
                            <label htmlFor="roomName" className="form-label">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomName"
                                placeholder="Enter room name"
                                value={roomCategoryName}  // You would define roomName as state
                                onChange={(e) => setRoomCategoryName(e.target.value)}  // Update the state when input changes
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomNumber" className="form-label">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder="Enter room price"
                                value={price}  // You would define roomNumber as state
                                onChange={(e) => setPrice(e.target.value)}  // Update the state when input changes
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                placeholder="Enter room amount"
                                value={amount}  // You would define capacity as state
                                onChange={(e) => setAmount(e.target.value)}  // Update the state when input changes
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirm({ roomCategoryName, price, amount })}  // Pass form data to confirm
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showModal2} onHide={handleCloseModal2} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form with input fields for the specific room */}
                    <form>
                        <input
                            type="hidden"
                            className="form-control"
                            id="categoryRoomID"
                            value={categoryRoomID}  // Set the input value from the specific room state
                            readOnly  // Make this field read-only
                        />
                        <div className="mb-3">
                            <label htmlFor="roomName" className="form-label">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roomName"
                                placeholder="Enter room name"
                                value={roomCategoryName}  // Specific room name state
                                onChange={(e) => setRoomCategoryName(e.target.value)}  // Update the state when input changes
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomNumber" className="form-label">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder="Enter room price"
                                value={price}  // Specific room price state
                                onChange={(e) => setPrice(e.target.value)}  // Update the state when input changes
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                placeholder="Enter room amount"
                                value={amount}  // Specific room amount state
                                onChange={(e) => setAmount(e.target.value)}  // Update the state when input changes
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseModal2}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirmEdit({ roomCategoryName, price, amount, categoryRoomID })}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    );
};

export default ViewAllRooms;
