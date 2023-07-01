import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import { RiEyeFill, RiEyeOffFill, RiMailLine } from 'react-icons/ri';
import "./Login.css";
import Navigation from "../components/Navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isError, isLoading, error }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navigation/>
      <Container className="log">
        <Row>
          <Col md={6} className="login__form--container">
            <fieldset>
              <Form style={{ width: "100%" }} onSubmit={handleLogin}>
                <h1>Login</h1>
                {isError && <Alert variant="danger">{error.data}</Alert>}
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                        <div className="email-input">
                            <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="email-icon">
                            <RiMailLine />
                            </span>
                        </div>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </span>
                  </div>
                </Form.Group>

                <Form.Group>
                  <Button type="submit" disabled={isLoading} className="btn-login">
                    Login
                  </Button>
                </Form.Group>

                <p className="pt-3 text-center" id="txt">
                  Don't have an account? <Link to="/signup">Create account</Link>{" "}
                </p>
              </Form>
            </fieldset>
          </Col>
          <Col md={6} className="login__image--container">
            <div className="login__image"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
