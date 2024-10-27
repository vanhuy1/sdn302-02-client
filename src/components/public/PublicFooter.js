// FooterComponent.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PublicFooter = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-4">
                <Row>
                    <Col lg={4} md={6} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase">Hotel Management</h5>
                        <p>
                            Welcome to our hotel.
                        </p>
                    </Col>

                    <Col lg={4} md={6} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase">SERVICES</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/about" className="text-dark">About Us</a>
                            </li>
                            <li>
                                <a href="/services" className="text-dark">Services</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-dark">Contact</a>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={4} md={12} className="mb-4 mb-md-0">
                        <h5 className="text-uppercase">Legal</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#privacy" className="text-dark">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#terms" className="text-dark">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#faq" className="text-dark">FAQ</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            <div className="text-center p-3 bg-dark text-white">
                © 2024 My Website. All rights reserved.
            </div>
        </footer>
    );
};

export default PublicFooter;
