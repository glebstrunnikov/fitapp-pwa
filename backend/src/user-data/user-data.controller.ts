import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { SessionGuard } from '../auth/session.guard';
import { UserDataService } from './user-data.service';
import { WorkoutPlanDataDto } from './user-data.dto';

@Controller('user-data')
@UseGuards(SessionGuard)
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Get()
  get(@Req() req: Request) {
    return this.userDataService.get(req.session.userId!);
  }

  @Put()
  save(@Req() req: Request, @Body() body: WorkoutPlanDataDto[]) {
    return this.userDataService.save(req.session.userId!, body);
  }
}
