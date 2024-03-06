/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';

import FormHandler from './FormHandler';
import IFormProps from './IFormProps';

export default function useForm({ ref, ...props } : IFormProps = {}) {
  const form = new FormHandler(ref ?? useRef<FormHandles>(null), props);

  return form;
}

export function isFieldDisabled(disabProp: any) {
  if (typeof disabProp === 'boolean') {
    return disabProp;
  }

  if (typeof disabProp === 'undefined') {
    return false;
  }

  return disabProp.value;
}
