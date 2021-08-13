import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "./Login.css";

import AuthService from "../../services/auth.service";
import Nav from "../Nav/Nav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      history.push("/");
    }
  }, []);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    setLoading(true);
    AuthService.login(email, password)
      .then(() => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error: any) => {
        setMessage(error.message);
        setLoading(false);
      });
  }

  const handleLogOut = () => {
    AuthService.logout();
    setCurrentUser({});
    window.location.reload();
    history.push("/");
  };

  return (
    <div className="Login" data-testid="Login">
      {!isLoggedIn && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <br />
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!loading && (
            <Button type="submit" disabled={!validateForm()}>
              Login
            </Button>
          )}
          {message && <Alert variant="danger">{message}</Alert>}
        </Form>
      )}

      {isLoggedIn && (
        <Button variant="primary" onClick={handleLogOut}>
          Log Out
        </Button>
      )}
      {isLoggedIn && <Nav />}
    </div>
  );
};

export default Login;
