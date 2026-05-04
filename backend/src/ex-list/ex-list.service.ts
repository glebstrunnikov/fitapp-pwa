import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExListService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ex.findMany();
  }

  create(data: { name: string; description?: string; videoUrl?: string }) {
    return this.prisma.ex.create({ data });
  }

  async update(
    id: string,
    data: { name?: string; description?: string; videoUrl?: string },
  ) {
    try {
      return await this.prisma.ex.update({ where: { id }, data });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      )
        return null;
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.ex.delete({ where: { id } });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      )
        return null;
      throw e;
    }
  }
}
