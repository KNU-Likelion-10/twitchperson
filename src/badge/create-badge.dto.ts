import { IsNumber, IsString } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
    name: string;

  @IsString()
    desc: string;

  @IsString()
    codition: string;

  @IsNumber()
    exp: number;
}
