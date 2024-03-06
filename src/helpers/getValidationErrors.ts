interface IErrors {
  [key: string]: string;
}

interface ZodErrorObj {
  code: string
  minimum: number
  type: string
  inclusive: boolean
  exact: boolean
  message: string
  path: string[]
}

export default function getValidationsErrors(error: any): IErrors {
  const validationErrors: IErrors = {};

  const errorParsed = JSON.parse(error);

  errorParsed.forEach((err: any) => {
    validationErrors[err.path[0] || ''] = err.message;
  });

  return validationErrors;
}
