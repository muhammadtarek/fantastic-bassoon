/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { Dialog, IFormStoreProps, Text, ImagePreview, Heading } from 'components';
import { useHistory, useParams } from 'react-router-dom';
import { IUpsertCarStore, ICarsStore, ICar } from 'store/types';
import { useDispatch, useSelector } from 'react-redux';
import { Constants, Colors } from 'utils';
import { resetCarForm, upsertCar } from 'store/actions';
import Locale from 'localization';
import { Stack } from 'office-ui-fabric-react';
import ColorPreview from 'components/colorPreview';
import CarFormMode from 'store/types/Car';

function DeleteCar() {
  const { id } = useParams();
  const car: ICar = useSelector(({ cars }: { cars: ICarsStore }) => cars.cars.find((c: ICar) => c.id === id))!;
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

  useEffect(() => {
    if (isUpserted) {
      history.push(Constants.LISTINGS);
      dispatch(resetCarForm());
    }
  }, [isUpserted]);

  const { images, color, description, name, price } = car;

  return (
    <Dialog
      mainAction={() => dispatch(upsertCar(car, CarFormMode.delete))}
      isLoading={isLoading}
      show
      dialogKey="delete_car"
      title={Locale.deleteCar.title}
      mainActionText={Locale.deleteCar.confirm}
      isAlert
      hideDialog={() => history.push(Constants.LISTINGS)}
      errors={errors}
      errorMessage={errorMessage}
    >
      <Stack tokens={{ childrenGap: 10 }} styles={{ root: { paddingTop: 20 } }}>
        <Stack horizontal tokens={{ childrenGap: 5 }} wrap>
          {images.map((image: string) => (
            <ImagePreview key={image} isSelected={false} src={image} />
          ))}
        </Stack>
        <Heading>{name}</Heading>
        <Text color={Colors.neutralTertiary}>{description}</Text>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Text>{Locale.listings.car.color}</Text>
          <ColorPreview color={color} />
        </Stack>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          <Text>{Locale.listings.car.price}</Text>
          <Stack horizontal horizontalAlign="end" verticalAlign="end" tokens={{ childrenGap: 5 }}>
            <Text mb={0}>{`${price} L.E`}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default DeleteCar;
