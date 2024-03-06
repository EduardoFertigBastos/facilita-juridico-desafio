import { RefObject } from 'react';

import { ZodError, ZodIssue, z } from 'zod';
import { FormHandles } from '@unform/core';

import IGridField from '@/components/form/FormBuilder/interfaces/IGridField';

import Toast from '@/hooks/toast/Toast';

import getValidationsErrors from '@/helpers/getValidationErrors';

import IFormProps from './IFormProps';

interface IConfig {
  errorMessage?: string;
  schema?: z.ZodObject<any>;
  abort?: boolean;
}

export default class FormHandler {

  constructor(
    ref: RefObject<FormHandles>,
    props: IFormProps,
  ) {
    this.ref = ref;
    this.schema = props.schema;
    this.fields = this.handleFields(props.fields);
  }

  ref: RefObject<FormHandles>;
  schema: z.ZodObject<any> | undefined;
  fields: IGridField[] | undefined;

  handleFields(fields: IGridField[] | undefined) {
    function prepareAttributeField({ field, attribute, commonCallbackParams }: any) {
      const attr = field[attribute];
      if (typeof field[attribute] === 'object' && field[attribute].callback) {
        attr.value = field[attribute].callback({
          params: field[attribute].params,
          ...commonCallbackParams,
        });
      }

      return attr;
    }

    if (!fields) {
      return undefined;
    }

    const attributesToHandle = [
      'disabled',
    ];

    return fields.map((field: any) => {

      const commonCallbackParams = {
        form: this.ref.current,
        data: this.ref.current?.getData() || {},
      };

      attributesToHandle.forEach((attribute) => {
        field[attribute] = prepareAttributeField({
          field,
          attribute,
          commonCallbackParams,
        });
      });

      return field;
    });
  }

  async validation(
    dataValidation: any,
    config?: IConfig,
  ) {
    try {
      this.ref.current?.setErrors({});

      const schema = this.schema ?? config?.schema as z.ZodObject<any>;

      const { error } = schema.parse(dataValidation);

      return true;
    } catch (err) {
      console.log(err)
      if (err instanceof ZodError) {
        const errors = getValidationsErrors(err);
        this.ref.current?.setErrors(errors);

        new Toast().error(errors[Object.keys(errors)[0]]);
      } else {
        new Toast().error(
          config?.errorMessage ?? 'Oops... There was an error submitting the form!',
        );
      }

    }

    if (config?.abort || config?.abort === undefined) {
      return false;
    }
  }

  getData() {
    return this.ref.current?.getData();
  }

  setData(data: object) {
    this.ref.current?.setData({
      ...this.getData(),
      ...data,
    });
  }

  clear() {

    function handleClear(fields: IGridField[] | undefined) {
      let objForm: { [key: string]: never[] | string } = {};

      return objForm;
    }

    this.ref.current?.reset();

    this.ref.current?.setData(
      handleClear(this.fields),
    );

  }

}
