import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrderItem } from 'modules/database/interfaces/orderItem';
import { OrderItem } from 'modules/database/models/orderItem';

import { OrderItemRepository } from '../repositories/order-item';

@Injectable()
export class OrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}

  public async save(model: IOrderItem): Promise<OrderItem> {
    return this.create(model);
  }

  public async remove(orderItemId: number): Promise<void> {
    const orderItem = await this.orderItemRepository.findById(orderItemId);

    if (!orderItem) {
      throw new NotFoundException('not-found');
    }

    return this.orderItemRepository.remove(orderItemId);
  }

  private async create(model: IOrderItem): Promise<OrderItem> {
    const order = await this.orderItemRepository.insert(model);

    return order;
  }
}
