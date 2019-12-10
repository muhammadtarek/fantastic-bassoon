import React, { useEffect } from 'react';
import { Title, PageContainer, SubHeading, CarCard, DataViewer } from 'components';
import Locale from 'localization';
import { Colors } from 'utils';
import { Stack } from 'office-ui-fabric-react';
import { useSelector, useDispatch } from 'react-redux';
import { ICarsStore, ICar } from 'store/types';
import { getAllCars } from 'store/actions';

function Listings() {
  const dispatch = useDispatch();
  const { isLoading, carsList, message } = useSelector(({ cars }: { cars: ICarsStore }) => ({
    isLoading: cars.isLoading,
    carsList: cars.cars,
    message: cars.message,
  }));

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  return (
    <PageContainer>
      <Title>{Locale.listings.header}</Title>
      <SubHeading color={Colors.neutralSecondary}>{Locale.listings.subheading}</SubHeading>
      <DataViewer
        errorMessage={message}
        isLoading={isLoading}
        hideSpinner={false}
        isEmpty={!isLoading && carsList.length === 0}
        isEmptyText={Locale.listings.empty}
      >
        <Stack styles={{ root: { marginTop: '20px' } }} horizontal wrap tokens={{ childrenGap: 10 }}>
          {carsList.map((car: ICar) => (
            <CarCard key={`${car.name}-${car.price}`} {...car} />
          ))}
        </Stack>
      </DataViewer>
    </PageContainer>
  );
}

export default Listings;
