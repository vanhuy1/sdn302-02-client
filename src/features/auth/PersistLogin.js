import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import { Modal, Button } from 'react-bootstrap';

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const navigate = useNavigate();

    const [trueSuccess, setTrueSuccess] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) verifyRefreshToken();
        }

        return () => effectRan.current = true;
    }, [persist, refresh, token]);

    useEffect(() => {
        if (isError) {
            setShowErrorModal(true);  // Show the error modal when an error occurs
        }
    }, [isError]);

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        navigate('/'); // <-- Navigate to the home page
    };

    let content;
    if (!persist) {
        content = <Outlet />;
    } else if (isLoading) {
        content = <PulseLoader color={"#FFF"} />;
    } else if (isError) {
        content = (
            <>
                {/* Display modal when an error occurs */}
                <Modal
                    show={showErrorModal}
                    onHide={handleCloseErrorModal}
                    centered
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {`${error?.data?.message} - `}
                            <Link to="/login" onClick={handleCloseErrorModal}>
                                Please login again
                            </Link>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseErrorModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else if (isSuccess && trueSuccess) {
        content = <Outlet />;
    } else if (token && isUninitialized) {
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;
