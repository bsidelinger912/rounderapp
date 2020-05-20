/**
 * @class Login
 * @description main login form for the app
 */

import React from 'react';

import {
  Form, TextField, Validation, Submit,
} from '../../components/form';

interface Values {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Login: React.FC = () => (
  <Form<Values>
    initialValues={{ email: '', password: '', passwordConfirmation: '' }}
    onSubmit={async (values): Promise<void> => {
      console.log(values);
    }}
    validate={(values: Values): Validation<Values> => {
      const errors: Validation<Values> = {};

      if (!values.email) {
        errors.email = 'Required';
      }

      if (!values.password) {
        errors.password = 'Required';
      }

      if (values.passwordConfirmation !== values.password) {
        errors.passwordConfirmation = 'Passwords do not match';
      }

      return errors;
    }}
  >
    <TextField
      name="email"
      placeholder="your email is your user ID"
      label="Email"
    />

    <TextField
      name="password"
      label="Password"
      password
    />

    <TextField
      name="passwordConfirmation"
      label="Confirm Password"
      password
    />

    <Submit title="Sign Up" />
  </Form>
);

export default Login;
