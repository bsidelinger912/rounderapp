/**
 * @class Form
 * @description form context provider to wire in state
 */

import React, { createContext, PropsWithChildren } from 'react';
import { Formik, FormikTouched } from 'formik';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export type Validation<Values> = {
  [P in keyof Values]?: string;
}

export interface Props<Values> {
  validate(values: Values): Validation<Values>;
  onSubmit(values: Values): Promise<void>;
  initialValues: Values;
}

export interface FormContext {
  onChange: (field: string) => (e: string | React.ChangeEvent<any>) => void;
  onBlur: (fieldOrEvent: string) => (e: any) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: Record<string, string | number>;
  errors: Record<string, string>;
  touched: FormikTouched<any>;
}

export const Context = createContext<FormContext>({} as any);

const Form = <Values, >({
  initialValues,
  validate,
  onSubmit,
  children,
}: PropsWithChildren<Props<Values>>): JSX.Element => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({
        handleChange, handleBlur, handleSubmit, values, errors, touched,
      }): JSX.Element => {
        const value: FormContext = {
          onChange: (name: string) => handleChange(name),
          onBlur: (name: string) => handleBlur(name),
          handleSubmit,
          values: values as any,
          errors: errors as any,
          touched,
        };

        return (
          <Context.Provider value={value}>
            {children}
          </Context.Provider>
        );
      }}
    </Formik>
  </TouchableWithoutFeedback>
  );

export default Form;
