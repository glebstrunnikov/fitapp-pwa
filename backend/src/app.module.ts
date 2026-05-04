import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ExListModule } from './ex-list/ex-list.module';
import { UserDataModule } from './user-data/user-data.module';

@Module({
  imports: [PrismaModule, AuthModule, ExListModule, UserDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
