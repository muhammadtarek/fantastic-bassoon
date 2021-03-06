import React, { useEffect } from 'react';
import { IFileSelectorProps } from 'components/fileSelector';
import { FieldType, IField, IFormStoreProps, IFieldsStack, Heading, SubHeading, Form } from 'components';
import Locale from 'localization';
import { useDispatch, useSelector } from 'react-redux';
import { IUpsertCarStore, ICar, ICarsStore } from 'store/types';
import Stack from 'office-ui-fabric-react/lib/components/Stack/Stack';
import { useHistory, useParams } from 'react-router-dom';
import { ITextFieldProps } from 'office-ui-fabric-react';
import { Colors, Constants } from 'utils';
import { resetCarForm, upsertCar } from 'store/actions';
import CarFormMode from 'store/types/Car';

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
  const { id } = useParams();
  const car = useSelector(({ cars }: { cars: ICarsStore }) => cars.cars.find((c: ICar) => c.id === id));
  const history = useHistory();
  const dispatch = useDispatch();
  const { errorMessage, errors, isLoading, isUpserted }: IFormStoreProps & IUpsertCarStore = useSelector(
    ({ upsertCar: upsertCartStore }: { upsertCar: IUpsertCarStore }) => ({
      errorMessage: upsertCartStore.message,
      isLoading: upsertCartStore.isLoading,
      errors: upsertCartStore.errors,
      isUpserted: upsertCartStore.isUpserted,
    }),
  );

  const fields: IFieldsStack[] = [
    {
      fields: [NameField, DescField, PriceField, ColorField, ImagesField],
    },
  ];

  useEffect(() => {
    if (isUpserted) {
      history.push(Constants.LISTINGS);
      dispatch(resetCarForm());
    }
  }, [isUpserted]);

  const mode = id ? CarFormMode.update : CarFormMode.insert;

  return (
    <Stack tokens={{ maxWidth: '375px' }}>
      <Heading>{Locale.upsertCar.insertHeading}</Heading>
      <SubHeading mb={4} style={{ fontWeight: 500 }} color={Colors.neutralSecondary}>
        {Locale.upsertCar.helpText}
      </SubHeading>
      <Form
        storeProps={{
          data: car || {},
          errorMessage,
          errors,
          isLoading,
          action: (data: ICar) => dispatch(upsertCar(data, mode)),
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
