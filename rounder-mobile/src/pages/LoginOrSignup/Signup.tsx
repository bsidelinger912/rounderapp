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
import { useSignup } from '../../auth/hooks';
import { AuthContext } from '../../auth/AuthProvider';

interface Values {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Signup: React.FC = () => {
  const auth = useContext(AuthContext);

  const { invoke, loading, error } = useSignup({
    onSuccess: (token: string) => {
      if (!auth.loading) auth.setToken(token);
    },
  });

  if (loading) {
    return <Loader visible />;
  }

  return (
    <Form<Values>
      initialValues={{ email: '', password: '', passwordConfirmation: '' }}
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

      <Error message={error} />

      <Submit title="Sign Up" />
    </Form>
  );
};

export default Signup;
