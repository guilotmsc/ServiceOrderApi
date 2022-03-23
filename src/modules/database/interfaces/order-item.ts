import { IOrder } from './order';

export interface IOrderItem {
  id?: number;
  orderId?: number;
  name: string;
  quantity: number;
  amount: number;
  order?: IOrder;

  createdDate?: Date;
  updatedDate?: Date;
}
