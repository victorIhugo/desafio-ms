import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublishObjectModule } from './modules/publish-object/publish_object.module';

@Module({
  imports: [PublishObjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
