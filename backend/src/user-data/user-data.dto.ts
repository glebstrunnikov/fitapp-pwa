import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ExDataDto {
  @IsString()
  exId: string;

  @IsOptional()
  @IsNumber()
  sets?: number;

  @IsOptional()
  @IsNumber()
  reps?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class WorkoutDataDto {
  @IsString()
  workoutId: string;

  @IsString()
  timestamp: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExDataDto)
  exes: ExDataDto[];
}

export class WorkoutPlanDataDto {
  @IsString()
  workoutPlanId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutDataDto)
  workouts: WorkoutDataDto[];
}
