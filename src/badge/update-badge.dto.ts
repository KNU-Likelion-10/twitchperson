import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBadgeDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly desc: string;

  @IsString()
  @IsOptional()
  readonly condition: string;

  @IsNumber()
  @IsOptional()
  readonly exp: number;
}
