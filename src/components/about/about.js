import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { GearFill, Fire } from 'react-bootstrap-icons';

const About = () => {
  return (
    <>
      <section className="py-3 py-md-5">
        <Container>
          <Row className="gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <Col xs={12} lg={6} xl={5}>
              <Image
                fluid
                rounded
                loading="lazy"
                src="https://static.vecteezy.com/system/resources/previews/015/694/771/original/hotel-reception-interior-with-receptionist-people-and-travelers-for-booking-in-flat-cartoon-hand-drawn-template-illustration-vector.jpg"
                alt="About 1"
              />
            </Col>
            <Col xs={12} lg={6} xl={7}>
              <Row className="justify-content-xl-center">
                <Col xs={12} xl={11}>
                  <h2 className="mb-3">Who Are We?</h2>
                  <p className="lead fs-4 text-secondary mb-3">
                    At Coder Hotel, we aim to revolutionize the way hotels manage their operations.
                    Our comprehensive hotel management system is designed to streamline booking processes, enhance guest services,
                    and ensure seamless communication between staff and customers.
                  </p>
                  <p className="mb-5">
                    We are dedicated to empowering hotels with the tools they need to deliver exceptional guest experiences.
                    Whether it's simplifying room bookings, optimizing resource management, or enhancing customer service,
                    our system provides a fully integrated solution that caters to hotels of all sizes.
                  </p>
                  <Row className="gy-4 gy-md-0 gx-xxl-5">
                    <Col xs={12} md={6}>
                      <div className="d-flex">
                        <div className="me-4 text-primary">
                          <GearFill size={32} />
                        </div>
                        <div>
                          <h2 className="h4 mb-3">Booking room</h2>
                          <p className="text-secondary mb-0">
                            We provide a user-friendly platform that simplifies the day-to-day operations of hotel management, from reservations to housekeeping.
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="d-flex">
                        <div className="me-4 text-primary">
                          <Fire size={32} />
                        </div>
                        <div>
                          <h2 className="h4 mb-3">Service</h2>
                          <p className="text-secondary mb-0">
                            We envision a future where hotel management is seamless, efficient, and entirely guest-focused.
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      );
    </>
  );
};

export default About;
