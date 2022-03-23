import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { OrderItem } from 'modules/database/models/order-item';

import { OrderItemRepository } from '../repositories/order-item';
import { OrderItemService } from '../services/order-item';
import { ListValidator } from '../validators/orderItem/list';
import { SaveValidator } from '../validators/orderItem/save';

@ApiTags('App: OrderItem')
@Controller('/order_item')
@AuthRequired()
export class OrderItemController {
  constructor(private orderItemRepository: OrderItemRepository, private orderItemService: OrderItemService) {}

  @Get(':orderId')
  @ApiResponse({ status: 200, type: [OrderItem] })
  public async list(@Query() model: ListValidator, @Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderItemRepository.list(model, orderId);
  }

  @Delete(':orderItemId')
  public async delete(@Param('orderItemId', ParseIntPipe) orderItemId: number) {
    return this.orderItemService.remove(orderItemId);
  }

  @Post()
  @ApiResponse({ status: 200, type: OrderItem })
  public async save(@Body() model: SaveValidator) {
    return this.orderItemService.save(model);
  }
}
