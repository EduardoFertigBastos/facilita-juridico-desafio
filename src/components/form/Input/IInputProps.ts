import { ComponentType } from 'react';

import { TextFieldProps } from '@mui/material';
import { IconBaseProps } from 'react-icons';

import FormFieldsSharedProps from '../FormFieldsSharedProps';

type IInputProps = {
  mask?: string;
  icon?: ComponentType<IconBaseProps>;
  iconByDefault?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  prefix?: string;
} & TextFieldProps & FormFieldsSharedProps;

export default IInputProps;
