/**
 * @class LoginOrSignup
 * @description allows user to either login or sign up for the App
 */

import React from 'react';
import {
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';

import Tabs from '../../components/Tabs';
import { mainPadding, topSpacing } from '../../spacing';

import Login from './Login';
import Signup from './Signup';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: mainPadding,
    paddingTop: topSpacing,
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
