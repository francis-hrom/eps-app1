import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage/HomePage";
import TargetsPage from "./pages/TargetsPage/TargetsPage";
import RankingsPage from "./pages/RankingsPage/RankingsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
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
