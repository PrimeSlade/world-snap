import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsProcessor } from './news.processor';

@Module({
  controllers: [NewsController],
  providers: [NewsService, NewsProcessor],
  exports: [NewsService],
})
export class NewsModule {}
