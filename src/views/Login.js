import React, { Component } from "react";
import "../assets/css/Form.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: null,
      isLogin: false,
      alertState: "alert alert-primary",
      loading: false,
    };
  }
  render() {
    return (
      <div class="panel">
        <div class="form">
          <h1 class="title">Welcome!</h1>
          <input
            required
            type="text"
            name="email"
            placeholder="Username"
            onChange={(evt) => this.setState({ email: evt.target.value })}
            value={this.state.email || ""}
          />
          {/* <input type="text" name="nip" placeholder="NIP"/> */}
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            onChange={(evt) => this.setState({ password: evt.target.value })}
            value={this.state.password || ""}
          />

          <button className="button-red">Login</button>
        </div>
      </div>
    );
  }
}
