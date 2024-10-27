import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../landing-page/header";
import Footer from "../landing-page/footer";
import Sidebar from "../Sidebar";
import Navtab from "./Navtab";

const Layout = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={2} className="bg-light shadow-sm">
                        <Sidebar />
                    </Col>
                    <Col md={10} className="mt-3 mb-5">
                        <p className="fs-4 fw-semibold">Manage</p>
                        <Navtab />
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};
export default Layout;
