import React, { memo } from 'react';
import classes from './Form.module.scss';

export const LabelComponent = ({ label, required }) => {
  return (
    <label>
      {label}
      {required && <span className={`${classes.errorClass}`}>*</span>}
    </label>
  );
};

export const InputWithLabel = ({ label, required, error, ...props }) => (
  <>
    <LabelComponent style={{ marginTop: '10px' }} label={label} required={required} />
    <input {...props} />
    {error && <div className={`${classes.errorClass}`}>{error}</div>}
  </>
);

export const TextAreaWithLabel = ({ label, required, error, ...props }) => (
  <>
    <LabelComponent label={label} required={required} />
    <textarea {...props}></textarea>
    {error && <div className={`${classes.errorClass}`}>{error}</div>}
  </>
);

export const SelectWithLabel = ({ label, required, children, error, ...props }) => (
  <>
    <LabelComponent label={label} required={required} />
    <select {...props}>{children}</select>
    {error && <div className={`${classes.errorClass}`}>{error}</div>}
  </>
);

export const Nonworkingdayslist = () => {
  return (
    <>
      <option value="Mon" label="Monday" />
      <option value="Tue" label="Tuesday" />
      <option value="Wed" label="Wednesday" />
      <option value="Thu" label="Thursday" />
      <option value="Fri" label="Friday" />
      <option value="Sat" label="Saturday" />
      <option value="Sun" label="Sunday" />{' '}
    </>
  );
};
