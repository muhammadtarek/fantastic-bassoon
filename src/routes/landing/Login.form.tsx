/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, IField, IFieldsStack, FieldType, Heading, SubHeading, IFormStoreProps } from 'components';
import { Link as RouterLink } from 'react-router-dom';
import { ITextFieldProps, Link, Stack } from 'office-ui-fabric-react';
import Locale from 'localization';
import { Colors } from 'utils';
import { IUserStore, ILogin } from 'store/types';
import { login } from 'store/actions';

const EmailField: IField<ITextFieldProps> = {
  itemKey: 'email',
  type: FieldType.textField,
  props: {
    label: Locale.landing.login.email,
    required: true,
    iconProps: { iconName: 'Mail' },
  },
};

const PasswordField: IField<ITextFieldProps> = {
  itemKey: 'password',
  type: FieldType.textField,
  props: {
    label: Locale.landing.login.password,
    type: 'password',
    required: true,
    iconProps: { iconName: 'PasswordField' },
  },
};

function LoginForm() {
  const dispatch = useDispatch();
  const { errorMessage, errors, isLoading }: IFormStoreProps = useSelector(({ user }: { user: IUserStore }) => ({
    errorMessage: user.message,
    isLoading: user.isLoading,
    errors: user.errors,
  }));
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
      <Form<ILogin>
        storeProps={{
          errorMessage,
          errors,
          isLoading,
          action: (data: ILogin) => dispatch(login(data)),
        }}
        id="login"
        name="login"
        buttonText={Locale.landing.login.cta}
        fieldsStacks={fields}
      />
      <Stack tokens={{ padding: 20 }} horizontalAlign="center">
        <Link>
          <RouterLink to="/signup">{Locale.landing.login.goToSignup}</RouterLink>
        </Link>
      </Stack>
    </>
  );
}

export default LoginForm;
