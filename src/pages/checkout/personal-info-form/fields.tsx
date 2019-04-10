import React from 'react';
import { Field } from 'react-final-form';
import validate from 'validate.js';

interface Constraints {
  presence: {
    allowEmpty: boolean
    message: string
  }
  email?: {
    message: string
  }
}

export const validateUsing = (constraints: Constraints) => {
  return (value?: string) => {
    const errors = validate.single(value, constraints);
    return Array.isArray(errors) && errors.length > 0 ? errors[0] : undefined;
  };
};

const FirstNameConstraints = {
  presence: {
    allowEmpty: false,
    message: 'First name is required',
  },
};
const LastNameConstraints = {
  presence: {
    allowEmpty: false,
    message: 'Last name is required',
  },
};
const PhoneConstraints = {
  presence: {
    allowEmpty: false,
    message: 'Phone is required',
  },
};

const EmailConstraints = {
  presence: {
    allowEmpty: false,
    message: 'Email is required',
  },
  email: {
    message: 'Email is invalid',
  },
};

export const FirstNameField = () => (
  <Field name='firstName' validate={validateUsing(FirstNameConstraints)}>
    {({ input, meta }) => (
      <div className='form-group col-6'>
        <label>
          <span>First Name <i className='text-danger'>*</i></span>
          <input {...input} type='text' className='form-control' autoComplete='firstName'/>
        </label>
      </div>
    )}
  </Field>
);

export const LastNameField = () => (
  <Field name='lastName' validate={validateUsing(LastNameConstraints)}>
    {({ input, meta }) => (
      <div className='form-group col-6'>
      <label>
        <span>Last Name <i className='text-danger'>*</i></span>
        <input {...input} type='text' className='form-control' autoComplete='lastName'/>
      </label>
      </div>
    )}
  </Field>
);

export const PhoneField = () => (
  <Field name='phone' validate={validateUsing(PhoneConstraints)}>
    {({ input, meta }) => (
      <div className='form-group col-6'>
        <label>
          <span>Phone Number <i className='text-danger'>*</i></span>
          <input {...input} type='text' className='form-control' autoComplete='tel'/>
        </label>
      </div>
    )}
  </Field>
);

export const EmailField = () => (
  <Field name='email' validate={validateUsing(EmailConstraints)}>
    {({ input, meta }) => (
      <div className='form-group col-6'>
        <label>
          <span>Email <i className='text-danger'>*</i></span>
          <input {...input} type='email' className='form-control' autoComplete='email'/>
        </label>
      </div>
    )}
  </Field>
);
