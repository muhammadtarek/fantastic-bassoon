import React, { useEffect } from 'react';
import { Title, PageContainer, SubHeading, CarCard, DataViewer, PermissionFlag, AuthRoute } from 'components';
import Locale from 'localization';
import { Colors, Constants } from 'utils';
import { Stack, PrimaryButton } from 'office-ui-fabric-react';
import { useSelector, useDispatch } from 'react-redux';
import { ICarsStore, ICar } from 'store/types';
import { getAllCars } from 'store/actions';
import { Switch, useHistory } from 'react-router-dom';
import UpsertCar from 'routes/upsertCar';
import DeleteCar from 'routes/deleteCar';

function Listings() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, carsList, message } = useSelector(({ cars }: { cars: ICarsStore }) => ({
    isLoading: cars.isLoading,
    carsList: cars.cars,
    message: cars.message,
  }));

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  function onCarEdit(id: string) {
    history.push(`${Constants.LISTINGS}/edit/${id}`);
  }

  function onCarDelete(id: string) {
    history.push(`${Constants.LISTINGS}/delete/${id}`);
  }

  return (
    <>
      <PageContainer>
        <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
          <Stack>
            <Title>{Locale.listings.header}</Title>
            <SubHeading color={Colors.neutralSecondary}>{Locale.listings.subheading}</SubHeading>
          </Stack>
          <PermissionFlag permissionKey={Constants.ADD_CAR}>
            <PrimaryButton onClick={() => history.push(Constants.ADD_CAR)}>{Locale.listings.create}</PrimaryButton>
          </PermissionFlag>
        </Stack>
        <DataViewer
          errorMessage={message}
          isLoading={isLoading}
          hideSpinner={false}
          isEmpty={!isLoading && carsList.length === 0}
          isEmptyText={Locale.listings.empty}
        >
          <Stack styles={{ root: { marginTop: '20px' } }} horizontal wrap tokens={{ childrenGap: 10 }}>
            {carsList.map((car: ICar) => (
              <CarCard key={car.id} onDelete={onCarDelete} onEdit={onCarEdit} {...car} />
            ))}
          </Stack>
        </DataViewer>
      </PageContainer>
      <Switch>
        <AuthRoute path={`${Constants.LISTINGS}/new`} component={UpsertCar} />
        <AuthRoute path={`${Constants.LISTINGS}/edit/:id`} component={UpsertCar} />
        <AuthRoute path={`${Constants.LISTINGS}/delete/:id`} component={DeleteCar} />
      </Switch>
    </>
  );
}

export default Listings;
