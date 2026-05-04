import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExDto, UpdateExDto } from './ex-list.dto';

@Injectable()
export class ExListService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ex.findMany();
  }

  create(data: CreateExDto) {
    return this.prisma.ex.create({ data });
  }

  async update(id: string, data: UpdateExDto) {
    try {
      return await this.prisma.ex.update({ where: { id }, data });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        return null;
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.ex.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        return null;
      throw e;
    }
  }
}
