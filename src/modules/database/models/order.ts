import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';
import { OrderItem } from './orderItem';
import { User } from './user';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public userId?: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        filter: (query: any) => query.select('id', 'firstName', 'lastName', 'email'),
        join: {
          from: 'User.id',
          to: 'Order.userId'
        }
      },
      orderItems: {
        devices: {
          relation: Model.HasManyRelation,
          modelClass: OrderItem,
          join: {
            from: 'Order.id',
            to: 'OrderItem.orderId'
          }
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
