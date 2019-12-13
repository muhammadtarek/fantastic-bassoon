import React from 'react';
import { Dialog } from 'components';
import { useHistory } from 'react-router-dom';

function DeleteCar() {
  const history = useHistory();

  useEffect(() => {
    if (isUpserted) {
      history.push(Constants.LISTINGS);
      dispatch(resetCarForm());
    }
  }, [isUpserted]);

  return (
    <Dialog
      mainAction={() => {}}
      isLoading={false}
      show
      dialogKey="delete_car"
      title="Delete"
      mainActionText="Confirm"
      isAlert
      hideDialog={() => {}}
    />
  );
}

export default DeleteCar;
