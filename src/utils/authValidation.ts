import {Validate} from './validate';

interface ValidationResult {
  [key: string]: string;
}

export interface AuthFormValues {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateAuthField = (
  key: string,
  values: AuthFormValues,
): string => {
  let message = '';


  switch (key) {
    case 'fullname':
      if (!values.fullname) {
        message = 'Full name is required!!!';
      }
      break;

    case 'email':
      if (!values.email) {
        message = 'Email is required!!!';
      } else if (!Validate.email(values.email)) {
        message = 'Email is not invalid!!';
      }
      break;

    case 'password':
      if (!values.password) {
        message = 'Password is required!!!';
      } else if (!Validate.Password(values.password)) {
        message = 'The password length must be greater than eight';
      }
      break;

    case 'confirmPassword':
      if (!values.confirmPassword) {
        message = 'Please type confirm password!!';
      } else if (values.confirmPassword !== values.password) {
        message = 'Password is not match!!!';
      }
      break;
  }

  return message;
};

export const validateAuthForm = (
  fields: string[],
  values: AuthFormValues,
): ValidationResult => {
  const errors: ValidationResult = {};

  fields.forEach(field => {
    const error = validateAuthField(field, values);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
