import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['description', 'createdDate', 'updatedDate'])
  @ApiProperty({ required: false, enum: ['description', 'createdDate', 'updatedDate'] })
  public orderBy: string;
}
