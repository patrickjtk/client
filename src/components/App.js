import React, { Component } from "react";
import "../assets/css/App.css";
import Header from "./Header";
import RegisterScreen from "../views/RegisterScreen";
import { Switch, Route, Router, BrowserRouter } from "react-router-dom";
import Login from "../views/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App" className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <RegisterScreen />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
