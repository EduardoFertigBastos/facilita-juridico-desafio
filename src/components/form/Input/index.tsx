import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { InputAdornment, TextField as MUITextField } from '@mui/material';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import Mask from '@/helpers/Mask';

import IInputProps from '@/components/form/Input/IInputProps';
import putMask from '@/components/form/Input/hooks/putMask';
import { Prefix } from '@/components/form/Input/styles';
import { isFieldDisabled } from '@/hooks/form/useForm';
import { errorColor } from '../../../styles/variables';
import Error from '../../../styles/styled-components/Error';

/**
 * Input component
 */
const Input: React.FC<IInputProps> = ({
  mask,
  name,
  placeholder,
  label,
  disabled,
  mb, mt, ml, mr,
  icon: Icon,
  prefix,
  iconByDefault = false,
  variant = 'outlined',
  readOnly = false,
  maxLength = undefined,
  type = 'text',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        if (inputRef.current) {
          inputRef.current.value = value ?? '';
        }
        setIsFilled(!!value);
      },
    });

  }, [fieldName, registerField]);

  /**
   * Handle key down event
   * Put mask on input if its designed to
   */
  const handleMaskEvents = useCallback((e: any) => {
    if (mask) {
      putMask(e, mask);
    }
  }, [mask]);

  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleLength = useCallback(() => {
    if (!mask) {
      return;
    }

    if (!Mask.MASK_ONLY_NUMBERS.includes(mask)) {
      return;
    }

    return Mask.getOnlyNumbers(mask).length;
  }, [mask]);

  const renderStartAdornment = useCallback((IconParam:any) => {
    if (iconByDefault || isFocused || isFilled) {
      if (IconParam) {
        return (
          <InputAdornment position="start">
            <IconParam color="#2196f3" size={20} />
          </InputAdornment>
        );
      }

      if (prefix) {
        return (
          <InputAdornment position="start">
            <Prefix>{prefix}</Prefix>
          </InputAdornment>
        );
      }
    }

  }, [isFocused, isFilled, iconByDefault, prefix]);

  return (
    <MUITextField
      id={fieldName}
      defaultValue={defaultValue}
      inputRef={inputRef}
      disabled={isFieldDisabled(disabled)}
      fullWidth
      name={name}
      label={label}
      placeholder={placeholder}
      onKeyDown={handleMaskEvents}
      onKeyUp={handleMaskEvents}
      onFocus={handleFocus}
      onBlur={handleBlur}
      variant={variant}
      error={!!error}
      sx={{
        mb: Number(mb),
        mt: Number(mt),
        ml: Number(ml),
        mr: Number(mr),
      }}

      InputLabelProps={{
        shrink: isFilled || isFocused,
        style: {
          zIndex: 0,
        },
      }}

      inputProps={{
        maxLength: maxLength ?? handleLength(),
        type,
        step: type === 'number' ? 'any' : undefined
      }}

      InputProps={{
        readOnly,
        startAdornment: renderStartAdornment(Icon),
        endAdornment: error && (
          <Error title={error}>
            <FiAlertCircle size={20} color={errorColor} />
          </Error>
        ),
      }}

      {...rest}
    />
  );
};

export default Input;
