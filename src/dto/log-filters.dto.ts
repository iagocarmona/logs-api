/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class LogFiltersDto {
  @IsOptional()
  @IsString()
  host?: string;

  @IsOptional()
  @IsString()
  eventSource?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  priority?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => new Date(value))
  fromDate?: Date;

  @IsOptional()
  @Transform(({ value }: { value: string }) => new Date(value))
  toDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  limit?: number = 50;
}
