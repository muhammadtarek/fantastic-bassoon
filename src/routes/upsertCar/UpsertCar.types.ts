import { ICar } from 'store/types';

enum CarFormMode {
  insert,
  update,
}

export interface IUpsertCarFormProps {
  mode: CarFormMode;
  car?: ICar;
}
