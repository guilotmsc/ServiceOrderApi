import { NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

/* eslint-disable max-len */
describe('Admin/OrderService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

  beforeEach(async () => {
    orderRepository = new OrderRepository();

    service = new OrderService(orderRepository);
  });

  const order: IOrder = {
    description: 'Order description'
  };

  it('should save a order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(model => Promise.resolve(model as any));

    const result = await service.save(order, { id: 1 } as any);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should remove a order', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce({ id: 1 } as any);
    jest.spyOn(orderRepository, 'remove').mockResolvedValueOnce({ id: 3 } as any);

    await service.remove(3);
  });

  it('should throw NotFoundException when try to remove and order was not found', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(1);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
