/**
 * @class Submit
 * @description a submit button for our form component
 */

import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Context } from './Form';

const styles = StyleSheet.create({
  buttonWrapper: {
    borderWidth: 1,
    borderColor: '#339FFF',
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#eee',
  },
});

const Submit: React.FC<{ title: string }> = ({ title }) => {
  const { handleSubmit } = useContext(Context);

  return (
    <View style={styles.buttonWrapper}>
      <Button onPress={(): void => handleSubmit()} title={title} />
    </View>
  );
};

export default Submit;
