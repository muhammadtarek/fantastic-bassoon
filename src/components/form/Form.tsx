import React, { useState, useMemo, useEffect } from 'react';
import {
  Stack,
  TextField,
  ComboBox,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  DatePicker,
  ChoiceGroup,
  DefaultButton,
  IComboBoxOption,
  IComboBoxProps,
  IChoiceGroupOption,
  IChoiceGroupProps,
  ColorPicker,
} from 'office-ui-fabric-react';

import { DateHelpers } from 'utils';
import FileSelector from '../fileSelector';
import Text from '../text';
import { IFormProps, IFieldsStack, IField, FieldType, IFormValidation } from './Form.types';
import { validateAllFields, validateField } from './Form.utils';

function SearchableComboBox(props: IComboBoxProps) {
  const [options, setOptions] = useState();

  useEffect(() => {
    setOptions(props.options);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.options]);

  function filterOptions(_option?: IComboBoxOption, _index?: number, value?: string | undefined) {
    if (value) {
      const filteredOptions = props.options.filter(option => option.text.includes(value));
      setOptions(filteredOptions);
    } else if (value === '') {
      setOptions(props.options);
    }
  }

  return <ComboBox {...props} onPendingValueChanged={filterOptions} options={options} />;
}

function renderFields({
  fields,
  setItem,
  errors,
  onFieldGetErrorMessage,
  shouldDisable,
  values,
}: {
  fields: IField[];
  setItem: Function;
  errors: Record<string, any>;
  onFieldGetErrorMessage: Function;
  shouldDisable: boolean;
  values: Record<string, any>;
}) {
  return fields.map(field => {
    const { props, regex, type, itemKey, errorMessage } = field;
    const { label, required } = props;

    function onGetErrorMessage(value: string) {
      const fieldErrorMessage = validateField({
        value,
        label,
        regex,
        errorMessage,
        isRequired: required,
      });
      onFieldGetErrorMessage(itemKey, fieldErrorMessage);
    }

    switch (type) {
      case FieldType.textField: {
        return (
          <TextField
            key={`${label}`}
            onChange={(_, newValue) => setItem(itemKey, newValue)}
            errorMessage={errors[itemKey]}
            onGetErrorMessage={onGetErrorMessage}
            validateOnFocusOut
            validateOnLoad={false}
            disabled={shouldDisable}
            value={values[itemKey]}
            {...props}
          />
        );
      }

      case FieldType.comboBox: {
        return (
          <SearchableComboBox
            key={`${label}`}
            disabled={shouldDisable}
            errorMessage={errors[itemKey]}
            onGetErrorMessage={onGetErrorMessage}
            onItemClick={(_, option: IComboBoxOption) => setItem(itemKey, option.key)}
            selectedKey={values[itemKey] && values[itemKey]}
            allowFreeform
            {...props}
          />
        );
      }

      case FieldType.datePicker: {
        return (
          <DatePicker
            key={`${label}`}
            disabled={shouldDisable}
            onSelectDate={(value?) => setItem(itemKey, new Date(value || '').toLocaleDateString('en-us'))}
            value={values[itemKey] && new Date(values[itemKey])}
            formatDate={(date: Date) => DateHelpers.convertToViewFormat(date.toString())}
            textbox={{
              validateOnFocusOut: true,
              validateOnLoad: false,
              errorMessage: errors[itemKey],
              onGetErrorMessage,
            }}
            {...props}
          />
        );
      }

      case FieldType.choiceGroup: {
        return (
          <ChoiceGroup
            key={`${label}`}
            disabled={shouldDisable}
            label={label}
            onChange={(_, option: IChoiceGroupOption) => setItem(itemKey, option.key)}
            styles={{
              flexContainer: {
                display: 'flex',
              },
            }}
            {...props}
            // eslint-disable-next-line react/destructuring-assignment
            options={props.options.map((option: IChoiceGroupOption) => ({
              ...option,
              text: `${option.text}\u00A0\u00A0`,
            }))}
          />
        );
      }

      case FieldType.fileSelector: {
        return (
          <Stack>
            <Text style={{ fontWeight: 600 }}>{label}</Text>
            <FileSelector
              key={`${label}`}
              disabled={shouldDisable}
              label={label}
              onFileSelect={(value: string[]) => setItem(itemKey, value)}
              // previewImages={values[itemKey]}
              {...props}
            />
          </Stack>
        );
      }

      case FieldType.colorPicker: {
        return (
          <Stack>
            <Text style={{ fontWeight: 600 }}>{label}</Text>
            <ColorPicker
              key={`${label}`}
              disabled={shouldDisable}
              label={label}
              onChange={(_, color: string) => setItem(itemKey, color)}
              {...props}
            />
          </Stack>
        );
      }

      default: {
        return <> </>;
      }
    }
  });
}

function renderStacks({
  stacks,
  setItem,
  errors,
  onFieldGetErrorMessage,
  shouldDisable,
  values,
}: {
  stacks: IFieldsStack[];
  setItem: Function;
  errors: Record<string, any>;
  onFieldGetErrorMessage: Function;
  shouldDisable: boolean;
  values: Record<string, any>;
}) {
  return stacks.map((stack, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Stack key={`subStack_${index}`} tokens={{ childrenGap: 15 }} {...stack}>
      {renderFields({
        fields: stack.fields,
        setItem,
        errors,
        onFieldGetErrorMessage,
        shouldDisable,
        values,
      })}
    </Stack>
  ));
}

function Form<T = Record<string, any>>(props: IFormProps<T>) {
  const {
    buttonText,
    storeProps,
    fieldsStacks,
    cancelButtonOnClick,
    cancelButtonText,
    disabled,
    onValidate,
    ...stackProps
  } = props;
  const { action, isLoading, data, errorMessage, errors } = storeProps;
  const allFields = useMemo(() => {
    return fieldsStacks.map(group => group.fields).flat();
  }, [fieldsStacks]);

  const [_errors, setErrors] = useState(errors || {});
  const [_errorMessage, setErrorMessage] = useState(errorMessage);
  const [tempData, setTempData] = useState({ ...data });
  const [canSubmit, setCanSubmit] = useState(false);
  const shouldDisable = isLoading || !!disabled;

  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  function setItem(key: string, value: string) {
    const newTempData = { ...tempData };
    // @ts-ignore
    newTempData[key] = value;
    setTempData(newTempData);

    const validationResults = validateAllFields({ fields: allFields, data: newTempData, errors: _errors });
    if (validationResults.isValid) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }

  // TODO: Add custom validation prop
  function onClick(evt: Record<string, any>) {
    evt.preventDefault();
    const formValidationResults = validateAllFields<T>({ fields: allFields, data: tempData, errors: _errors });
    let externalValidationResults: IFormValidation<T> = {
      isValid: true,
    };

    // If custom onValidate method is provided
    if (onValidate && data) {
      externalValidationResults = onValidate(data);
    }

    if (!formValidationResults.isValid && !externalValidationResults.isValid) {
      setErrors({ ...formValidationResults.errors, ...externalValidationResults.errors });

      if (externalValidationResults.errorMessage) {
        setErrorMessage(externalValidationResults.errorMessage);
      }
    } else if (action) {
      console.log(tempData);
      action(tempData);
    }
  }

  function onCancel() {
    if (cancelButtonOnClick) {
      cancelButtonOnClick();
    }
  }

  function onFieldGetErrorMessage(itemKey: string, fieldErrorMessage: string) {
    const newErrorMessages: Record<string, any> = { ..._errors };
    newErrorMessages[itemKey] = fieldErrorMessage;
    setErrors(newErrorMessages);
  }

  const messageBarStyles = () => ({
    root: {
      maxWidth: '300px',
    },
  });

  useEffect(() => {
    allFields.forEach(field => {
      switch (field.type) {
        case FieldType.choiceGroup:
        case FieldType.comboBox: {
          const choiceGroupProps: IChoiceGroupProps | IComboBoxProps = field.props;
          if (choiceGroupProps.defaultSelectedKey) {
            setItem(field.itemKey, choiceGroupProps.defaultSelectedKey.toString());
          }

          break;
        }

        default: {
          break;
        }
      }
    });
  }, []); // eslint-disable-line

  return (
    <form onSubmit={onClick}>
      <Stack tokens={{ childrenGap: 20 }} grow={false} {...stackProps}>
        {renderStacks({
          stacks: fieldsStacks,
          setItem,
          errors: _errors,
          onFieldGetErrorMessage,
          shouldDisable,
          values: tempData,
        })}
        {_errorMessage && (
          <MessageBar messageBarType={MessageBarType.error} styles={messageBarStyles}>
            {_errorMessage}
          </MessageBar>
        )}
        <Stack horizontal verticalAlign="center" horizontalAlign="end" tokens={{ childrenGap: 5 }}>
          {cancelButtonText && (
            <DefaultButton onClick={onCancel} disabled={shouldDisable}>
              {cancelButtonText}
            </DefaultButton>
          )}
          <PrimaryButton
            disabled={shouldDisable || !canSubmit}
            onClick={onClick}
            style={{ maxWidth: 'max-content' }}
            onRenderChildren={() => (isLoading ? <Spinner size={SpinnerSize.medium} /> : <span>{buttonText}</span>)}
          />
        </Stack>
      </Stack>
    </form>
  );
}

export default Form;
export { Form, FieldType };
