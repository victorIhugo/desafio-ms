import { Module } from '@nestjs/common';
import { PublishController } from './publish.controller';
import { PublishService } from './publish.service';

@Module({
  imports: [],
  controllers: [PublishController],
  providers: [PublishService],
})
export class PublishModule {}
