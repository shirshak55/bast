/*eslint no-console: ["error", { allow: ["error"] }] */
import React, { Component } from "react";
import { Formik } from "formik";
import Router from "next/router";
import styled from "styled-components";
import InputField from "../components/Input";
import Button from "../components/Button";
import Content from "../components/Content";
import api, { setToken } from "../utils/api";
import { UserContext } from "../utils/context";

const initialValues = {
  email: "",
  password: ""
};

class Register extends Component {
  static contextType = UserContext;
  // Register new user then login with it.
  onSubmit = async form => {
    try {
      // First register new user.
      await api.post("/register", form);
      // Then logged new user.
      const { data } = await api.post("/login", form);
      // Store all info in localStorage + set axios header.
      setToken(data.token);
      this.context.setUser(data.user);
      Router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Content title="Create a new account">
        <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <Wrapper>
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email && errors.email}
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Your secret password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password && errors.password}
                />
                <Button type="submit" disabled={isSubmitting} text="Submit" />
              </Wrapper>
            </form>
          )}
        </Formik>
      </Content>
    );
  }
}

const Wrapper = styled.div`
  width: 40%;
`;

export default Register;