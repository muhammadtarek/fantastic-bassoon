/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Form, IField, IFieldsStack, FieldType, Heading, SubHeading, IFormStoreProps } from 'components';
import { Link as RouterLink } from 'react-router-dom';
import { ITextFieldProps, Link, Stack } from 'office-ui-fabric-react';
import Locale from 'localization';
import { Colors } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { IUserStore, IUser } from 'store/types';
import { signup } from 'store/actions';

const NameField: IField<ITextFieldProps> = {
  itemKey: 'name',
  type: FieldType.textField,
  props: {
    label: Locale.landing.signup.name,
    required: true,
    iconProps: { iconName: 'ReminderPerson' },
  },
};

const EmailField: IField<ITextFieldProps> = {
  itemKey: 'email',
  type: FieldType.textField,
  props: {
    label: Locale.landing.signup.email,
    required: true,
    iconProps: { iconName: 'Mail' },
  },
};

const PasswordField: IField<ITextFieldProps> = {
  itemKey: 'password',
  type: FieldType.textField,
  props: {
    label: Locale.landing.signup.password,
    type: 'password',
    required: true,
    iconProps: { iconName: 'PasswordField' },
  },
};

const UsernameField: IField<ITextFieldProps> = {
  itemKey: 'username',
  type: FieldType.textField,
  props: {
    label: Locale.landing.signup.username,
    required: true,
    iconProps: { iconName: 'Accounts' },
  },
};

const PhoneNumberField: IField<ITextFieldProps> = {
  itemKey: 'phone',
  type: FieldType.textField,
  props: {
    label: Locale.landing.signup.phoneNumber,
    required: true,
    iconProps: { iconName: 'Phone' },
  },
};

function SignupForm() {
  const dispatch = useDispatch();
  const { errorMessage, errors, isLoading }: IFormStoreProps = useSelector(({ user }: { user: IUserStore }) => ({
    errorMessage: user.message,
    errors: user.errors,
    isLoading: user.isLoading,
  }));

  const fields: IFieldsStack[] = [
    {
      fields: [NameField, EmailField, PasswordField, UsernameField, PhoneNumberField],
    },
  ];

  return (
    <>
      <Heading>{Locale.landing.signup.heading}</Heading>
      <SubHeading mb={4} style={{ fontWeight: 500 }} color={Colors.neutralSecondary}>
        {Locale.landing.signup.help}
      </SubHeading>
      <Form<IUser>
        storeProps={{ errorMessage, errors, isLoading, action: (data: IUser) => dispatch(signup(data)) }}
        id="signup"
        name="signup"
        buttonText={Locale.landing.signup.cta}
        fieldsStacks={fields}
      />
      <Stack tokens={{ padding: 20 }} horizontalAlign="center">
        <Link>
          <RouterLink to="/login">{Locale.landing.signup.goToLogin}</RouterLink>
        </Link>
      </Stack>
    </>
  );
}

export default SignupForm;
