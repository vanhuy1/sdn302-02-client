import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
const Public = () => {
  const content = (
    <>
      <section className="banner_main">
        <Carousel interval={2000} fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First slide"
              style={{ width: "1920px", height: "800px", objectFit: "cover" }}
            />
            <div className="form-overlay">
              <Container>
                <Row>
                  <Col md={5} className="mx-auto">
                    <div
                      className="book_room text-center"
                      style={{
                        marginTop: "300px",
                        backgroundColor: "rgb(183, 255, 244, 0.5)",
                        border: "2px solid rgb(183, 255, 244, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h1>Welcome!</h1>
                      <p style={{ fontStyle: "italic" }}>
                        We offer luxurious accommodations with excellent service
                        to ensure you have a memorable experience. Book your room
                        today!
                      </p>
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
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second slide"
              style={{ width: "1920px", height: "800px", objectFit: "cover" }}
            />
            <div className="form-overlay">
              <Container>
                <Row>
                  <Col md={5} className="mx-auto">
                    <div
                      className="book_room text-center"
                      style={{
                        marginTop: "300px",
                        backgroundColor: "rgb(183, 255, 244, 0.5)",
                        border: "2px solid rgb(183, 255, 244, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h1>Welcome!</h1>
                      <p style={{ fontStyle: "italic" }}>
                        We offer luxurious accommodations with excellent service
                        to ensure you have a memorable experience. Book your room
                        today!
                      </p>
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
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1920&h=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Third slide"
              style={{ width: "1920px", height: "800px", objectFit: "cover" }}
            />
            <div className="form-overlay">
              <Container>
                <Row>
                  <Col md={5} className="mx-auto">
                    <div
                      className="book_room text-center"
                      style={{
                        marginTop: "300px",
                        backgroundColor: "rgb(183, 255, 244, 0.5)",
                        border: "2px solid rgb(183, 255, 244, 0.5)",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h1>Welcome!</h1>
                      <p style={{ fontStyle: "italic" }}>
                        We offer luxurious accommodations with excellent service
                        to ensure you have a memorable experience. Book your room
                        today!
                      </p>
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
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );

  return content;
};

export default Public;
