import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

type MyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const MyInput: React.FC<MyInputProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, {error}] = useField(props);
  return (
    <FormControl isInvalid= {!!error }>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};