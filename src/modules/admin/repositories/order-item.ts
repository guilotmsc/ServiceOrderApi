import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrderItem } from 'modules/database/interfaces/order-item';
import { OrderItem } from 'modules/database/models/order-item';
import { Page, Transaction } from 'objection';

@Injectable()
export class OrderItemRepository {
  public async list(params: IPaginationParams, orderId: number, transaction?: Transaction): Promise<Page<OrderItem>> {
    let query = OrderItem.query(transaction)
      .select('*')
      .where('orderId', '=', orderId)
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'name') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('name', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('name', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async findById(id: number, transaction?: Transaction): Promise<OrderItem> {
    return OrderItem.query(transaction).findById(id);
  }

  public async insert(model: IOrderItem, transaction?: Transaction): Promise<OrderItem> {
    return OrderItem.query(transaction).insert(model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await OrderItem.query(transaction)
      .del()
      .where({ id });
  }
}
