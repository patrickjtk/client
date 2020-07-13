import React, { Component } from "react";
import "../assets/css/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="Header">
        <div className="d-inline-flex h-100  align-items-center">
          <img
            className="h-50"
            alt="Logo"
            src={require("../assets/images/logo.svg")}
          />
        </div>
      </div>
    );
  }
}

export default Header;
