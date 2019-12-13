import { ICar } from 'store/types';

export interface ICarCardProps extends ICar {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRent?: (id: string) => void;
}
