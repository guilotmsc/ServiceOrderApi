import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { OrderController } from './controllers/order';
import { OrderItemController } from './controllers/order-item';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { OrderRepository } from './repositories/order';
import { OrderItemRepository } from './repositories/order-item';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { OrderService } from './services/order';
import { OrderItemService } from './services/order-item';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, OrderController, OrderItemController, TestController],
  providers: [
    AuthService,
    UserRepository,
    UserService,
    OrderService,
    OrderRepository,
    OrderItemService,
    OrderItemRepository
  ]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
