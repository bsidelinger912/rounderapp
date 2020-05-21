/**
 * @class Error
 * @description error for inline or form level validation
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface Props {
  message?: string;
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    height: 40,
  },
});

const Error: React.FC<Props> = ({ message }) => (
  <Text style={styles.error}>{message ? `Error: ${message}` : null}</Text>
);

export default Error;
