import React, { useState, useEffect, useRef } from 'react';

import InputField from './InputField.styles';
import { strings, validation } from '../../utils/helpers';
import { useUpdate } from '../../hooks';

const Input = ({
  label = '',
  type,
  placeholder,
  required,
  error,
  onValidate,
  checkAgainst,
  nameProp,
  disabled,
  valueProp = ''
}) => {
  const [input, setInput] = useState(valueProp);
  const [isValid, setIsValid] = useState();
  const [name] = useState(strings.toCamelCase(label));
  const [bypassValidation] = useState(onValidate ? false : true);

  const inputID = strings.toKebabCase(label);

  const ref = useRef();

  useUpdate(() => {
    checkAgainst
      ? setIsValid(validation.checkEquality(input, checkAgainst))
      : setIsValid(
          validation[name]?.(input, bypassValidation) ??
            !validation.isEmpty(input)
        );
  }, [input, checkAgainst]);

  useEffect(() => {
    onValidate?.({
      [name]: {
        valid: isValid ?? false,
        value: input
      }
    });
  }, [isValid, input, name, onValidate]);

  return (
    <InputField
      className={isValid === false && 'invalid'}
      required={required}
      data-error={error}
      ref={ref}
    >
      <label htmlFor={inputID}>{label}</label>
      <input
        id={inputID}
        name={nameProp || inputID}
        type={type ?? 'text'}
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        required={required}
        disabled={disabled}
      />
    </InputField>
  );
};

export default Input;
