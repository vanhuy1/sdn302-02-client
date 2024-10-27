import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Contact = () => {
    return (
        <>
            <section className="bg-light py-3 py-md-5">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={10} lg={8} xl={7} xxl={6}>
                            <h3 className="fs-6 text-secondary mb-2 text-uppercase text-center">Get in Touch</h3>
                            <h2 className="display-5 mb-4 mb-md-5 text-center">We're always on the lookout to work with new clients.</h2>
                            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className="gy-3 gy-md-4 gy-lg-0 align-items-xl-center">
                        <Col xs={12} lg={6}>
                            <img className="img-fluid rounded" loading="lazy" src="https://th.bing.com/th/id/R.682afc37949863a891188c4cc626e094?rik=EuuDxHu8y2QeLQ&pid=ImgRaw&r=0" alt="Get in Touch" />
                        </Col>
                        <Col xs={12} lg={6}>
                            <Row className="justify-content-xl-center">
                                <Col xs={12} xl={11}>
                                    <div className="bg-white border rounded shadow-sm overflow-hidden p-4">
                                        <p style={{ fontStyle: "italic" }}>
                                            We offer luxurious accommodations with excellent service to ensure you have a memorable experience. Book your room today!
                                        </p>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Link to="/dash/booking">
                                                <Button
                                                    className="book_btn"
                                                    type="button"
                                                    style={{ marginTop: "20px" }}
                                                >
                                                    Book Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Contact;
