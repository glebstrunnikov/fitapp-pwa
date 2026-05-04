import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutPlanDataDto } from './user-data.dto';

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

  async save(userId: string, data: WorkoutPlanDataDto[]) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { userData: data as object[] },
    });
    return { ok: true };
  }
}
