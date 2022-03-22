import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrderItem } from 'modules/database/interfaces/orderItem';

export class SaveValidator implements IOrderItem {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public name: string;

  @ApiProperty({ required: true, type: 'number' })
  public quantity: number;

  @ApiProperty({ required: true, type: 'number' })
  public amount: number;
}
