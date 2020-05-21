/**
 * @class Login
 * @description main login form for the app
 */

import React, { useContext } from 'react';
import { validateEmail } from 'rounder-shared';

import {
  Form, TextField, Validation, Submit, Error,
} from '../../components/form';
import Loader from '../../components/Loader';
import { AuthContext } from '../../auth/AuthProvider';
import { useLogin } from '../../auth/hooks';

interface Values {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = useContext(AuthContext);

  const { invoke, loading, error } = useLogin({
    onSuccess: (token: string) => {
      if (!auth.loading) auth.setToken(token);
    },
  });

  if (loading) {
    return <Loader visible />;
  }

  return (
    <Form<Values>
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values): Promise<void> => {
        await invoke(values);
      }}
      validate={(values: Values): Validation<Values> => {
        const errors: Validation<Values> = {};

        if (!values.email) {
          errors.email = 'Required';
        } else if (!validateEmail(values.email)) {
          errors.email = 'Not a valid email';
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

      <Error message={error} />

      <Submit title="Log In" />
    </Form>
  );
};

export default Login;
