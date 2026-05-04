import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { userData: true },
    });
    return user?.userData ?? [];
  }

  async save(userId: string, data: unknown[]) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { userData: data },
    });
    return { ok: true };
  }
}
