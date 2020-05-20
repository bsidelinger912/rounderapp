/**
 * @class TextField
 * @description a label, input and error holder for text inputs
 */

import React, { useContext } from 'react';
import {
  Text, StyleSheet, View, TextInput,
} from 'react-native';

import { Context } from './Form';

export interface Props {
  name: string;
  label: string;
  password?: boolean;
  placeholder?: string;
}

const styles = StyleSheet.create({
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
  error: {
    color: 'red',
    height: 40,
  },
});

const TextField: React.FC<Props> = ({ placeholder, name }) => {
  const {
    values, onChange, onBlur, errors, touched,
  } = useContext(Context);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={values[name] as string}
        placeholder={placeholder}
        style={styles.input}
      />
      <Text style={styles.error}>{touched[name] && errors[name]}</Text>
    </View>
  );
};

export default TextField;
