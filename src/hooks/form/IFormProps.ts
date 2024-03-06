import { z } from 'zod';

import IGridField from '@/components/form/FormBuilder/interfaces/IGridField';
import { RefObject } from 'react';
import { FormHandles } from '@unform/core';

export default interface IFormProps {
  ref?: RefObject<FormHandles>;

  helper?: any;
  fields?: IGridField[];
  schema?: z.ZodObject<any>;
}
