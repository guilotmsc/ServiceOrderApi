import { IUser } from './user';

export interface IOrder {
  id?: number;
  userId?: number;
  description: string;
  user?: IUser;

  createdDate?: Date;
  updatedDate?: Date;
}
