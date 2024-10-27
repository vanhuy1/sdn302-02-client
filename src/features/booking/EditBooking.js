import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBooking, fetchCurrentBookings, selectAllBookings } from './BookingSlice';
import { Form, Button, Container, Nav, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EditBooking = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookings = useSelector(selectAllBookings);
    const bookingToEdit = bookings.find((booking) => booking._id === id);
    const [categoryRoomId, setCategoryRoomId] = useState('');
    const [startDate, setStartDate] = useState(bookingToEdit?.startDate || '');
    const [endDate, setEndDate] = useState(bookingToEdit?.endDate || '');
    const [amountBook, setAmountBook] = useState(bookingToEdit?.amountBook || 1);

    const handleRoomChange = (e) => {
        const value = e.target.value;
        if (categoryRoomId.includes(value)) {
            setCategoryRoomId(categoryRoomId.filter((room) => room !== value));
        } else {
            setCategoryRoomId([...categoryRoomId, value]);
        }
    };

    useEffect(() => {
        if (!bookingToEdit) {
            dispatch(fetchCurrentBookings);
        }
    }, [dispatch, bookingToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            categoryRoomId,
            startDate,
            endDate,
            amountBook
        };

        dispatch(updateBooking({ id, updatedData }))
            .then((action) => {
                // Kiểm tra nếu action là fulfilled
                if (updateBooking.fulfilled.match(action)) {
                    navigate('/dash/viewroom');

                } else {
                    console.error('Failed to fetch booking details');
                }
            });
    };

    return (

        <Container className="my-4">
            {/* Navigate */}
            <Nav className="mb-4 justify-content-center" >
                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/dash/booking"
                        className="text-white fw-bold bg-primary rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Booking Room
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mx-4">
                    <Nav.Link
                        as={Link}
                        to="/dash/viewroom"
                        className="text-white fw-bold bg-success rounded p-2"
                        style={{ transition: 'background-color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#20c997'}
                    >
                        View Your Booking
                    </Nav.Link>
                </Nav.Item>

            </Nav>
            <h2 className="text-center">Edit Booking</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formRoomType" className="mb-4">
                    <Form.Label className="fw-bold">Room Categories</Form.Label>
                    <Row>
                        <Col md={4}>
                            <Form.Check
                                type="checkbox"
                                label="Basic Room"
                                value="670108b4cd419eb477134f34"
                                onChange={handleRoomChange}
                                className="my-2"
                            />
                            <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                        </Col>
                        <Col md={4}>
                            <Form.Check
                                type="checkbox"
                                label="Modern Room"
                                value="670108b4cd419eb477134f35"
                                onChange={handleRoomChange}
                                className="my-2"
                            />
                            <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                        </Col>
                        <Col md={4}>
                            <Form.Check
                                type="checkbox"
                                label="Luxury Room"
                                value="670108b4cd419eb477134f36"
                                onChange={handleRoomChange}
                                className="my-2"
                            />
                            <Image src="https://th.bing.com/th/id/OIP.AZ1nXW2LL-KdxgqX62gqUQHaE8?rs=1&pid=ImgDetMain" rounded className="mt-2" style={{ width: '200px', height: '200px' }} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAmountBook">
                    <Form.Label>Amount of Rooms</Form.Label>
                    <Form.Control
                        type="number"
                        value={amountBook}
                        onChange={(e) => setAmountBook(e.target.value)}
                        min="1"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
};

export default EditBooking;
