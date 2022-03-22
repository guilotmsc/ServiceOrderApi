import { Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: IOrder, currentUser: ICurrentUser): Promise<Order> {
    model.userId = currentUser.id;
    return this.create(model);
  }

  public async remove(orderId: number): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('not-found');
    }

    return this.orderRepository.remove(orderId);
  }

  private async create(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.insert(model);

    return order;
  }
}
