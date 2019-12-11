import React, { useEffect } from 'react';
import { IFileSelectorProps } from 'components/fileSelector';
import { FieldType, IField, IFormStoreProps, IFieldsStack, Heading, SubHeading, Form } from 'components';
import Locale from 'localization';
import { useDispatch, useSelector } from 'react-redux';
import { IUpsertCarStore, ICar } from 'store/types';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { useHistory } from 'react-router-dom';
import { ITextFieldProps } from 'office-ui-fabric-react';
import { Colors, Constants } from 'utils';
import { resetCarForm, upsertCar } from 'store/actions';

const ImagesField: IField<IFileSelectorProps> = {
  itemKey: 'images',
  type: FieldType.fileSelector,
  props: {
    id: 'cars_images',
    children: Locale.upsertCar.upload,
    label: Locale.upsertCar.images,
  },
};

const NameField: IField<ITextFieldProps> = {
  itemKey: 'name',
  type: FieldType.textField,
  props: {
    label: Locale.upsertCar.name,
    required: true,
  },
};

const DescField: IField<ITextFieldProps> = {
  itemKey: 'description',
  type: FieldType.textField,
  props: {
    label: Locale.upsertCar.desc,
    required: true,
  },
};

const ColorField: IField<ITextFieldProps> = {
  itemKey: 'color',
  type: FieldType.textField,
  props: {
    label: Locale.upsertCar.color,
    required: true,
  },
};

const PriceField: IField<ITextFieldProps> = {
  itemKey: 'price',
  type: FieldType.textField,
  props: {
    label: Locale.upsertCar.price,
    required: true,
  },
};

function UpsertCarForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { errorMessage, errors, isLoading }: IFormStoreProps = useSelector(
    ({ upsertCar: upsertCartStore }: { upsertCar: IUpsertCarStore }) => ({
      errorMessage: upsertCartStore.message,
      isLoading: upsertCartStore.isLoading,
      errors: upsertCartStore.errors,
    }),
  );

  const fields: IFieldsStack[] = [
    {
      fields: [NameField, DescField, PriceField, ColorField, ImagesField],
    },
  ];

  useEffect(() => {
    dispatch(resetCarForm());
  }, []);

  return (
    <Stack tokens={{ maxWidth: '375px' }}>
      <Heading>{Locale.upsertCar.insertHeading}</Heading>
      <SubHeading mb={4} style={{ fontWeight: 500 }} color={Colors.neutralSecondary}>
        {Locale.upsertCar.helpText}
      </SubHeading>
      <Form
        storeProps={{
          errorMessage,
          errors,
          isLoading,
          action: (data: ICar) => dispatch(upsertCar(data)),
        }}
        id="upsertCar"
        name="upsertCar"
        buttonText={Locale.upsertCar.submit}
        fieldsStacks={fields}
        cancelButtonText={Locale.upsertCar.cancel}
        cancelButtonOnClick={() => history.push(Constants.LISTINGS)}
      />
    </Stack>
  );
}

export default UpsertCarForm;
