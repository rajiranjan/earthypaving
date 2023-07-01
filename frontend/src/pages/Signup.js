import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";
import { RiEyeFill, RiEyeOffFill, RiMailLine } from "react-icons/ri";
import Navigation from "../components/Navigation";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();

    signup({ name, email, password });
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navigation />
      <Container className="signup">
        <Row>
          <Col md={6}>
            <div className="signup__image"></div>
          </Col>
          <Col md={6} className="signup__form--container">
            <Form onSubmit={handleSignup}>
              <h1 style={{color:"#000"}}>Create an account</h1>
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

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
                    type={showPassword ? "text" : "password"}
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
                <Button type="submit" disabled={isLoading} className="btn-signup">
                  Create account
                </Button>
              </Form.Group>

              <p className="pt-3 text-center" id="txt">
                Already have an account? <Link to="/login">Login</Link>{" "}
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
