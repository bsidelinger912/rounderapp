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
}

const Login: React.FC = () => (
  <Form<Values>
    initialValues={{ email: '', password: '' }}
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

    <Submit title="Log In" />
  </Form>
);

export default Login;
