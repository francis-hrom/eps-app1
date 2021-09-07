import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import authService from "../../services/users/auth.service";

const Navigation = (): JSX.Element => {
  const handleLogOut = () => {
    const confirmation = confirm("Do you want to log out?");
    if (confirmation) {
      authService.logout();
      window.location.reload();
    }
  };
  return (
    <div className="Navigation" data-testid="Navigation">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            EPS
            <TrendingUpIcon style={{ color: "white" }} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/targets">Targets</Nav.Link>
            <Nav.Link href="/rankings">Rankings</Nav.Link>
            <Nav.Link href="/find-selector">Find Selector</Nav.Link>
            <Nav.Link href="/scan-rankings">Scan Rankings</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/" onClick={handleLogOut}>
              Logout <ExitToAppIcon style={{ color: "white" }} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
