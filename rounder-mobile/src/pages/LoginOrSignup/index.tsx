/**
 * @class LoginOrSignup
 * @description allows user to either login or sign up for the App
 */

import React from 'react';
import {
  Button, View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Text,
} from 'react-native';
import { Formik } from 'formik';

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
  inputWrapper: {
    width: '100%',
  },
  inputLabel: {
    marginBottom: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    height: 40,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

const LoginOrSignup: React.FC = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({
      handleChange, handleBlur, handleSubmit, values,
    }): JSX.Element => (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.heading}>Log in or Sign up</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password:</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholder="password"
              style={styles.input}
            />
          </View>

          <Button onPress={(): void => handleSubmit()} title="Submit" />
        </View>
      </TouchableWithoutFeedback>
    )}
  </Formik>
);

export default LoginOrSignup;
