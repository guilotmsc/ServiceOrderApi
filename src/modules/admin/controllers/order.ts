import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { ListValidator } from '../validators/order/list';
import { SaveValidator } from '../validators/order/save';

@ApiTags('App: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator) {
    return this.orderRepository.list(model);
  }

  @Get()
  @ApiResponse({ status: 200, type: Order })
  public async details(@CurrentUser() order: IOrder) {
    const orders = this.orderRepository.findById(order.id);

    if (!orders) throw new NotFoundException();

    return orders;
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }

  @Post()
  @ApiResponse({ status: 201, type: Order })
  public async save(@Body() model: SaveValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.save(model, currentUser);
  }
}
