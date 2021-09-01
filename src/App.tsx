import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import authService from "./services/auth.service";

import Navigation from "./components/Navigation/Navigation";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import TargetsPage from "./pages/TargetsPage/TargetsPage";
import RankingsPage from "./pages/RankingsPage/RankingsPage";
import FindSelectorPage from "./pages/FindSelectorPage/FindSelectorPage";
import GetRankingsPage from "./pages/GetRankingsPage/GetRankingsPage";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
            {isLoggedIn && <Redirect to="/" />}
          </Route>
          <div>
            <Container fluid="xxl">
              <Navigation />
              <Route path="/targets">
                <TargetsPage />
              </Route>
              <Route path="/rankings">
                <RankingsPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/find-selector">
                <FindSelectorPage />
              </Route>
              <Route path="/get-rankings">
                <GetRankingsPage />
              </Route>
            </Container>
          </div>
        </Switch>
        {!isLoggedIn && <Redirect to="/login" />}
      </Router>
    </div>
  );
}

export default App;
