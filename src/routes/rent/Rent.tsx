/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
import { MyClass } from './rental.js';
import React, { useState, useEffect } from 'react';
import {
  PageContainer,
  ImagePreview,
  Heading,
  MegaTitle,
  Caption,
  Text,
  DataViewer,
  Title,
  IField,
  FieldType,
  Form,
  IFieldsStack,
  SubHeading,
  IFormStoreProps,
} from 'components';
import {
  Button,
  Stack,
  Image,
  IDatePickerProps,
  ITextFieldProps,
  IComboBoxProps,
  PrimaryButton,
} from 'office-ui-fabric-react';
import Locale from 'localization';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ICarsStore, ICar, IUpsertRentStore } from 'store/types';
import { Colors, Constants } from 'utils';
import ColorPreview from 'components/colorPreview';
import { getAllCars, upsertRent, resetRentForm } from 'store/actions';
import RentFormMode from 'store/types/Rent';

const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const StartDateField: IField<IDatePickerProps> = {
  itemKey: 'startDate',
  type: FieldType.datePicker,
  props: {
    label: Locale.rent.startDate,
    isRequired: true,
  },
};

const StartTimeField: IField<ITextFieldProps> = {
  itemKey: 'startTime',
  type: FieldType.textField,
  regex: new RegExp(timeRegex),
  errorMessage: 'Time format is not correct',
  props: {
    label: Locale.rent.time,
    required: true,
    description: '24 hours format',
    iconProps: {
      iconName: 'Clock',
    },
  },
};

const EndDateField: IField<IDatePickerProps> = {
  itemKey: 'endDate',
  type: FieldType.datePicker,
  props: {
    label: Locale.rent.endDate,
    isRequired: true,
  },
};

const EndTimeField: IField<ITextFieldProps> = {
  itemKey: 'endTime',
  type: FieldType.textField,
  regex: new RegExp(timeRegex),
  errorMessage: 'Time format is not correct',
  props: {
    label: Locale.rent.time,
    required: true,
    description: '24 hours format',
    iconProps: {
      iconName: 'Clock',
    },
  },
};

function Rent() {
  const [rentDetails, setRentDetails] = useState<{ startTime: string; endTime: string }>({
    startTime: '',
    endTime: '',
  });
  const [rentHours, setRentHours] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { car, isLoadingCars } = useSelector(({ cars }: { cars: ICarsStore }) => ({
    car: cars.cars.find((c: ICar) => c.id === id),
    isLoadingCars: cars.isLoading,
  }));
  const { errorMessage, errors, isLoading, isUpserted }: IFormStoreProps & IUpsertRentStore = useSelector(
    ({ upsertRent: upsertRentStore }: { upsertRent: IUpsertRentStore }) => ({
      errorMessage: upsertRentStore.message,
      isLoading: upsertRentStore.isLoading,
      errors: upsertRentStore.errors,
      isUpserted: upsertRentStore.isUpserted,
    }),
  );

  const { images, color, description, name, price } = car || {
    price: 0,
  };

  useEffect(() => {
    if (!car) {
      dispatch(getAllCars());
    }
  }, []);

  useEffect(() => {
    if (isUpserted) {
      history.push(Constants.LISTINGS);
      dispatch(resetRentForm());
    }
  }, [isUpserted]);

  const [selectedImagePreview, setSelectedImagePreview] = useState(0);
  const fields: IFieldsStack[] = [
    {
      horizontal: true,
      fields: [StartDateField, StartTimeField],
    },
    {
      horizontal: true,
      fields: [EndDateField, EndTimeField],
    },
  ];

  function onFormChange({
    startDate,
    startTime,
    endDate,
    endTime,
  }: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  }) {
    const startDateTime = new Date(`${startDate} ${startTime}`);
    const endDateTime = new Date(`${endDate} ${endTime}`);
    let totalHours = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / 36e5;

    if (isNaN(totalHours)) {
      totalHours = 1;
    }

    setRentHours(totalHours);
    setRentDetails({
      startTime: startDateTime.toString(),
      endTime: endDateTime.toString(),
    });
  }

  function onFormSubmit() {
    // @ts-ignore
    dispatch(upsertRent({ ...rentDetails, carId: id }, RentFormMode.insert));
  }

  return (
    <PageContainer>
      <Stack>
        <Button
          onClick={() => history.push(Constants.LISTINGS)}
          styles={{ root: { width: 'max-content' } }}
          iconProps={{ iconName: 'back' }}
        >
          {Locale.rent.back}
        </Button>
      </Stack>

      <DataViewer isLoading={isLoadingCars}>
        <Stack
          tokens={{ childrenGap: 40 }}
          styles={{ root: { marginTop: 20 } }}
          horizontal
          horizontalAlign="start"
          verticalAlign="start"
        >
          <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: '55%' } }} maxWidth="60%">
            <Image
              styles={{ image: { width: '100%', height: '300px', borderRadius: '8px', objectFit: 'cover' } }}
              src={images && images[selectedImagePreview]}
              width="100%"
            />

            <Stack horizontal tokens={{ childrenGap: 5 }} wrap>
              {images &&
                images.map((image: string, index: number) => (
                  <ImagePreview
                    radius="60px"
                    key={`${id}-${index}`}
                    isSelected={index === selectedImagePreview}
                    onClick={() => setSelectedImagePreview(index)}
                    src={image}
                  />
                ))}
            </Stack>
            <Stack tokens={{ childrenGap: 1 }}>
              <Title>{name}</Title>
              <Heading style={{ fontWeight: 300 }} color={Colors.neutralTertiary}>
                {description}
              </Heading>
            </Stack>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
                <Text>{Locale.listings.car.color}</Text>
                <ColorPreview color={color || 'white'} />
              </Stack>
            </Stack>
          </Stack>
          
          <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: '40%' } }} maxWidth="40%">
            <Stack>
              
              <Title>{Locale.rent.rent}</Title>
              <SubHeading color={Colors.neutralSecondary}>{Locale.rent.helpText}</SubHeading>
            </Stack>
            <Form
              // @ts-ignore
              onFormChange={onFormChange}
              storeProps={{
                errorMessage,
                errors,
                isLoading,
                action: () => {},
              }}
              id="login"
              name="login"
              buttonText={Locale.rent.confirm}
              fieldsStacks={fields}
              disableSubmitButton
            />
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
              <Text>Total</Text>
              <Stack horizontal horizontalAlign="end" verticalAlign="end" tokens={{ childrenGap: 5 }}>
                <Heading>{price}</Heading>
                <Heading>{`x${rentHours}`}</Heading>
                <MegaTitle mb={0} color={Colors.themePrimary}>
                  {price * rentHours}
                </MegaTitle>
                <Caption mb={1} color={Colors.themePrimary}>
                  L.E
                </Caption>
              </Stack>
            </Stack>
            <PrimaryButton onClick={onFormSubmit} disabled={isLoading}>
              {Locale.rent.confirm}
            </PrimaryButton>
          </Stack>
        </Stack>
      </DataViewer>
    
    </PageContainer>
    
    
  );

}
  
new MyClass();
export default Rent;
