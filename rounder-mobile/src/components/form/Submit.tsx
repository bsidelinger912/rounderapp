/**
 * @class Submit
 * @description a submit button for our form component
 */

import React, { useContext } from 'react';
import { Button } from 'react-native';

import { Context } from './Form';

const Submit: React.FC<{ title: string }> = ({ title }) => {
  const { handleSubmit } = useContext(Context);

  return (
    <Button onPress={(): void => handleSubmit()} title={title} />
  );
};

export default Submit;
