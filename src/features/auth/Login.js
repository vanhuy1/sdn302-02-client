import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import PulseLoader from 'react-spinners/PulseLoader'
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            // errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#FFF"} />


    const content = (
        <div className="vh-100" style={{ backgroundColor: "#DFF2EB" }}>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col xl={10}>
                        <Card style={{ borderRadius: "1rem" }}>
                            <Row className="g-0">
                                <Col md={6} lg={5} className="d-none d-md-block">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/loginbg.png`}
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: "1rem 0 0 1rem" }}
                                    />
                                </Col>
                                <Col md={6} lg={7} className="d-flex align-items-center">
                                    <Card.Body className="p-4 p-lg-5 text-black">
                                        <Form onSubmit={handleSubmit}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i
                                                    className="fas fa-cubes fa-2x me-3"
                                                    style={{ color: "#ff6219" }}
                                                ></i>
                                                <span className="h1 fw-bold mb-0">Login</span>
                                            </div>

                                            <h5
                                                className="fw-normal mb-3 pb-3"
                                                style={{ letterSpacing: "1px" }}
                                            >
                                                Sign into your account
                                            </h5>
                                            <Form.Group controlId="username">
                                                <Form.Label>Username:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    ref={userRef}
                                                    value={username}
                                                    onChange={handleUserInput}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="password">
                                                <Form.Label>Password:</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    onChange={handlePwdInput}
                                                    value={password}
                                                    required
                                                />
                                            </Form.Group>

                                            <Button type="submit" className="w-100 mt-3">
                                                Sign In
                                            </Button>

                                            <Form.Group controlId="persist" className="mt-3">
                                                <Form.Check
                                                    type="checkbox"
                                                    id="persist"
                                                    label="Trust This Device"
                                                    onChange={handleToggle}
                                                    checked={persist}
                                                />
                                            </Form.Group>
                                            <p
                                                className="mb-5 pb-lg-2"
                                                style={{ color: "#393f81" }}
                                            >
                                                Don't have an account?{" "}
                                                <a href="/register" style={{ color: "#393f81" }}>
                                                    Register here
                                                </a>
                                            </p>
                                        </Form>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )

    return content
}
export default Login