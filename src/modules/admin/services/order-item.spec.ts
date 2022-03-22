import { NotFoundException } from '@nestjs/common';
import { IOrderItem } from 'modules/database/interfaces/orderItem';

import { OrderItemRepository } from '../repositories/order-item';
import { OrderItemService } from './order-item';

/* eslint-disable max-len */
describe('Admin/OrderItemService', () => {
  let orderItemRepository: OrderItemRepository;
  let service: OrderItemService;

  beforeEach(async () => {
    orderItemRepository = new OrderItemRepository();

    service = new OrderItemService(orderItemRepository);
  });

  const item: IOrderItem = {
    name: 'Item A',
    amount: 15,
    quantity: 2,
    orderId: 1
  };

  it('should save a order item', async () => {
    jest.spyOn(orderItemRepository, 'insert').mockImplementationOnce(model => Promise.resolve(model as any));

    const result = await service.save(item);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(item);
  });

  it('should remove a order item', async () => {
    jest.spyOn(orderItemRepository, 'findById').mockResolvedValueOnce({ id: 1 } as any);
    jest.spyOn(orderItemRepository, 'remove').mockResolvedValueOnce({ id: 3 } as any);

    await service.remove(3);
  });

  it('should throw NotFoundException when try to remove and item was not found', async () => {
    jest.spyOn(orderItemRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(1);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
