import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import TargetsPage from "./pages/TargetsPage/TargetsPage";
import RankingsPage from "./pages/RankingsPage/RankingsPage";
import Login from "./components/Login/Login";

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Login />
        <Switch>
          <Route path="/targets">
            <TargetsPage />
          </Route>
          <Route path="/rankings">
            <RankingsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
