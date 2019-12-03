/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Form, IField, IFieldsStack, FieldType, Heading, SubHeading } from 'components';
import { Link as RouterLink } from 'react-router-dom';
import { ITextFieldProps, Link, Stack } from 'office-ui-fabric-react';
import Locale from 'localization';
import { Colors } from 'utils';

const EmailField: IField<ITextFieldProps> = {
  itemKey: 'email',
  type: FieldType.textField,
  props: {
    label: Locale.landing.login.email,
    required: true,
  },
};

const PasswordField: IField<ITextFieldProps> = {
  itemKey: 'password',
  type: FieldType.textField,
  props: {
    label: Locale.landing.login.password,
    type: 'password',
    required: true,
  },
};

function LoginForm() {
  const fields: IFieldsStack[] = [
    {
      fields: [EmailField, PasswordField],
    },
  ];

  return (
    <>
      <Heading>{Locale.landing.login.heading}</Heading>
      <SubHeading mb={4} style={{ fontWeight: 500 }} color={Colors.neutralSecondary}>
        {Locale.landing.login.help}
      </SubHeading>
      <Form id="login" name="login" buttonText={Locale.landing.login.cta} fieldsStacks={fields} />
      <Stack padding={20} horizontalAlign="center">
        <Link>
          <RouterLink to="/signup">{Locale.landing.login.goToSignup}</RouterLink>
        </Link>
      </Stack>
    </>
  );
}

export default LoginForm;
