import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from '../auth/session.guard';
import { ExListService } from './ex-list.service';
import { CreateExDto, UpdateExDto } from './ex-list.dto';

@Controller('exes')
export class ExListController {
  constructor(private readonly exListService: ExListService) {}

  @Get()
  findAll() {
    return this.exListService.findAll();
  }

  @Post()
  @UseGuards(SessionGuard)
  create(@Body() body: CreateExDto) {
    return this.exListService.create(body);
  }

  @Patch(':id')
  @UseGuards(SessionGuard)
  async update(@Param('id') id: string, @Body() body: UpdateExDto) {
    const ex = await this.exListService.update(id, body);
    if (!ex) throw new NotFoundException();
    return ex;
  }

  @Delete(':id')
  @UseGuards(SessionGuard)
  async remove(@Param('id') id: string) {
    const ex = await this.exListService.remove(id);
    if (!ex) throw new NotFoundException();
    return ex;
  }
}
