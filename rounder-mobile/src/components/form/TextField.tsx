/**
 * @class TextField
 * @description a label, input and error holder for text inputs
 */

import React, { useContext } from 'react';
import {
  Text, StyleSheet, View, TextInput,
} from 'react-native';

import { borderLightGrey } from '../../colors';

import { Context } from './Form';
import Error from './Error';

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
    borderColor: borderLightGrey,
    borderWidth: 1,
    height: 40,
    padding: 10,
    marginBottom: 5,
    width: '100%',
  },
});

const TextField: React.FC<Props> = ({
  placeholder, name, password, label,
}) => {
  const {
    values, onChange, onBlur, errors, touched,
  } = useContext(Context);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={values[name] as string}
        placeholder={placeholder}
        secureTextEntry={password}
        style={styles.input}
      />
      <Error message={(touched[name] && errors[name]) || undefined} />
    </View>
  );
};

export default TextField;
