import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrderItem } from '../interfaces/order-item';
import { Order } from './order';

export class OrderItem extends Model implements IOrderItem {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public orderId?: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'number' })
  public quantity: number;
  @ApiProperty({ type: 'number' })
  public amount: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'OrderItem';
  }

  public static get relationMappings(): any {
    return {
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        filter: (query: any) => query.select('id', 'description'),
        join: {
          from: 'Order.id',
          to: 'OrderItem.orderId'
        }
      }
    };
  }

  public static get virtualAttributes(): string[] {
    return ['name', 'quantity', 'amount'];
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

  public $formatJson(data: IOrderItem): IOrderItem {
    return data;
  }
}
