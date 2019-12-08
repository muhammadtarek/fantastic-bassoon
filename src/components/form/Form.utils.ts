import { IField, IFormValidation } from './Form.types';

export function validateField({
  value = '',
  label,
  regex,
  errorMessage,
  isRequired,
}: {
  value?: string;
  label?: string;
  regex?: string;
  errorMessage?: string;
  isRequired?: boolean;
} = {}): string | undefined {
  if (isRequired) {
    if (value === null || value === undefined || value === '') {
      return `${label} is required`;
    }
  }

  if (regex && !value.match(regex)) {
    return errorMessage;
  }

  return undefined;
}

export function validateAllFields<T>({
  fields,
  data,
  errors = {},
}: {
  fields: IField[];
  data: Record<string, any>;
  errors?: Record<string, any>;
}): IFormValidation<T> {
  const tempErrorMessages = { ...errors };
  let isValid = true;
  for (const field of fields) {
    const {
      itemKey,
      props: { label, required, isRequired },
      regex,
      errorMessage,
    } = field;
    const fieldErrorMessage = validateField({
      value: data[itemKey],
      label,
      regex,
      errorMessage,
      isRequired: required || isRequired,
    });

    if (fieldErrorMessage) isValid = false;
    tempErrorMessages[itemKey] = fieldErrorMessage;
  }

  return {
    isValid,
    // @ts-ignore
    errors: tempErrorMessages,
  };
}
