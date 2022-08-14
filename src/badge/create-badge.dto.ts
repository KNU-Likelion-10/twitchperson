import { IsString } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
    name: string;

  @IsString()
    desc: string;

  @IsString()
    condition: string;

  @IsString()
    exp: string;
}
