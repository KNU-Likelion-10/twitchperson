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
  readonly codition: string;

  @IsNumber()
  @IsOptional()
  readonly exp: number;
}
