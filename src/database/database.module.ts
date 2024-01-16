import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  controllers: [],
  imports: [],
})
export class DatabaseModule {}
