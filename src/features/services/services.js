import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Content from "../../components/services/common/content";
import Sidebar from "../../components/Sidebar";

const Services = () => {
  return (
    <>
      <Row className="flex-grow-1">
        <Col xs={12} md={10} className="mt-3 mb-5">
          <Content />
        </Col>
      </Row>
    </>
  );
};

export default Services;
