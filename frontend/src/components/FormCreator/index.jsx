import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '../Button';

import styles from './styles.module.sass';

function FormCreator({
  referenceKey,
  title,
  fields,
  onSubmit,
  onSuccess,
  resetFlag,
}) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initValues = {};
    fields.forEach((field) => {
      initValues[field.key] = field.initValue;
    });
    setValues(initValues);
  }, [fields, resetFlag]);

  function onValueChange(key, val) {
    setValues({
      ...values,
      [key]: val,
    });
  }

  function onSubmitButtonClick(ev) {
    ev.preventDefault();
    const fieldsErrors = {};
    let errorsFlag = false;

    Object.entries(values).forEach(([key, value]) => {
      const fieldValidator = fields.find((field) => field.key === key).validator || (() => null);
      fieldsErrors[key] = fieldValidator(value);
      if (fieldsErrors[key]) errorsFlag = true;
    });

    setErrors(fieldsErrors);
    if (!errorsFlag) {
      onSubmit(referenceKey, values).then((response) => {
        if (response && response.errors) setErrors(response.errors);
        else onSuccess(referenceKey);
      });
    }
  }

  return (
    <form>
      {title && (<h3 className={styles.headline}>{title}</h3>)}
      {fields.map((field) => (
        <div key={field.key} className={styles.fieldContainer}>
          <label htmlFor={field.key} className={styles.fieldLabel}>
            {field.label}
          </label>
          <input
            id={field.key}
            value={values[field.key]}
            onChange={(ev) => onValueChange(field.key, ev.target.value)}
            type={field.type}
            className={styles.field}
          />
          {errors[field.key] && (
            <p className={styles.fieldError}>
              {errors[field.key]}
            </p>
          )}
        </div>
      ))}
      <div className={styles.formOptions}>
        <Button onClick={onSubmitButtonClick}>
          <FontAwesomeIcon icon={['fas', 'save']} /> Save
        </Button>
      </div>
    </form>
  );
}

export const formFieldsPropTypes = PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      initValue: PropTypes.any,
      validator: PropTypes.func,
    }),
).isRequired;

FormCreator.propTypes = {
  referenceKey: PropTypes.any,
  title: PropTypes.string,
  fields: formFieldsPropTypes,
  onSubmit: PropTypes.func,
  onSuccess: PropTypes.func,
  resetFlag: PropTypes.bool,
};

FormCreator.defaultProps = {
  title: '',
  onSubmit: () => {},
  onSuccess: () => {},
  resetFlag: false,
};

export default FormCreator;
