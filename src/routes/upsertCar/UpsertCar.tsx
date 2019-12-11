import React from 'react';
import { Modal } from 'office-ui-fabric-react';
import UpsertCarForm from './UpsertCar.form';

function UpsertCar() {
  return (
    <Modal styles={{ main: { padding: 40 } }} isOpen>
      <UpsertCarForm />
    </Modal>
  );
}

export default UpsertCar;
