import React, { Component } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import RegisterService from "../services/RegisterService";
import "../assets/css/Form.css";
import { Link } from "react-router-dom";

const phoneRegEx = /^(\+628 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label("Email")
    .test("email_unique", "Try another email", async (value) => {
      if (value.length > 8) {
        return (await new RegisterService().uniqueEmail(value)).data.data;
      } else {
        return true;
      }
    }),
  first_name: Yup.string().required().label("First Name"),
  last_name: Yup.string().required().label("Last Name"),
  year: Yup.number().min(1900),
  mobile_number: Yup.string()
    .required()
    .min(12)
    .matches(phoneRegEx, "Invalid Phone Number")
    .label("Mobile Number")
    .test("mobile_unique", "Try another number", async (value) => {
      if (value.length > 12) {
        return (await new RegisterService().uniqueMobilePhone(value)).data.data;
      } else {
        return true;
      }
    }),
});

class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      dates: [],
      error: null,
      isLogin: false,
      alertState: "alert alert-primary",
      loading: false,
    };

    this.register = this.register.bind(this);
  }

  async register(fields) {
    this.setState({ loading: true });
    const registerService = new RegisterService();
    let payload = await registerService.register(fields);
    if (
      payload &&
      200 === payload.status &&
      payload.data &&
      payload.data.success
    ) {
      this.setState({
        error: false,
        errorMessage: payload && payload.data ? payload.data.message : payload,
      });
    } else {
      console.log(payload);
      this.setState({
        error: true,
        errorMessage: payload && payload.data ? payload.data.message : payload,
        loading: false,
      });
    }
  }

  render() {
    let months = [],
      dates = [];
    for (let index = 0; index < 12; index++) {
      months[index] = (index + 1).toString().padStart(2, "0");
    }
    for (let index = 0; index < 31; index++) {
      dates[index] = (index + 1).toString().padStart(2, "0");
    }
    return (
      <div>
        <div className="panel pb-3">
          <div className="form">
            <h1 className="title">Register</h1>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                month: "",
                date: "",
                year: "",
                gender: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                this.register(values);
              }}
            >
              <Form>
                <fieldset
                  disabled={this.state.loading || this.state.error == false}
                >
                  <div className="form-group row">
                    <ErrorMessage name="mobile_number">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      className="form-control"
                      name="mobile_number"
                      type="text"
                      placeholder="Mobile number (+628xxx)"
                    />
                  </div>
                  <div className="form-group row">
                    <ErrorMessage name="first_name">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group row">
                    <ErrorMessage name="last_name">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>
                  <label htmlFor="moanth" className="text-left">
                    Date of Birth
                  </label>
                  <div className="form-row">
                    <Field
                      as="select"
                      name="month"
                      placeholder="Month"
                      className="form-control col"
                    >
                      <option value="">Month</option>
                      {months.map((monthVal) => (
                        <option value={monthVal} key={monthVal}>
                          {monthVal}
                        </option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="date"
                      placeholder="Date"
                      className="form-control col"
                    >
                      <option value="">Date</option>
                      {dates.map((dateVal) => (
                        <option value={dateVal} key={dateVal}>
                          {dateVal}
                        </option>
                      ))}
                    </Field>
                    <Field
                      name="year"
                      type="text"
                      placeholder="Year"
                      className="form-control col"
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      type="radio"
                      name="gender"
                      className="form-check-input radio-custom"
                      value="1"
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      type="radio"
                      name="gender"
                      className="form-check-input radio-custom"
                      value="2"
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                  <div className="form-group row">
                    <ErrorMessage name="email">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>

                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group row">
                    <button type="submit" className="btn btn-block btn-purple">
                      Submit
                    </button>
                  </div>
                </fieldset>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="panel pt-0">
          {this.state.loading || this.state.error == false ? (
            <div className="form">
              <div className="form-group row">
                <Link to="/login" className="btn btn-block btn-purple">
                  Login
                </Link>
              </div>
            </div>
          ) : (
            <div className="form p-0">
              <div className="form-group row purple-bg">
                <h1 className="title text-center w-100 text-white">FOOTER</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
