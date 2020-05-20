/**
 * @class LoginOrSignup
 * @description allows user to either login or sign up for the App
 */

import React from 'react';
import {
  StyleSheet, Text, KeyboardAvoidingView, Platform,
} from 'react-native';

import Tabs from '../../components/Tabs';

import Login from './Login';
import Signup from './Signup';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    padding: 15,
    paddingTop: 80,
  },
});

const LoginOrSignup: React.FC = () => (
  <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Tabs
      tabs={[
        {
          label: 'Log in',
          render: (): JSX.Element => <Login />,
        },
        {
          label: 'Sign up',
          render: (): JSX.Element => <Signup />,
        },
      ]}
    />
  </KeyboardAvoidingView>
);

export default LoginOrSignup;
