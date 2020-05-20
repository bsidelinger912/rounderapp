/**
 * @class LoginOrSignup
 * @description allows user to either login or sign up for the App
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {
  Form, TextField, Validation, Submit,
} from '../../components/form';


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
  },
});

interface Values {
  email: string;
  password: string;
}

const LoginOrSignup: React.FC = () => (
  <Form<Values>
    initialValues={{ email: '', password: '' }}
    onSubmit={async (values: Values): Promise<void> => {
      console.log('**** submit');
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
    <View style={styles.container}>
      <Text style={styles.heading}>Log in or Sign up</Text>

      <TextField
        name="email"
        placeholder="your email is your user ID"
        label="Email"
      />

      <TextField
        name="password"
        label="Password"
      />

      <Submit title="Sign In" />
    </View>
  </Form>
);

export default LoginOrSignup;
