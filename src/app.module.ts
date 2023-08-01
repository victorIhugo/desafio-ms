import { Module } from '@nestjs/common';
import { ConsumeModule } from './modules/consume/consume.module';
import { PublishModule } from './modules/publish/publish.module';

@Module({
  imports: [PublishModule, ConsumeModule],
})
export class AppModule {}
