import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsCronService } from './news.cron.service';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [ScheduleModule.forRoot(), NewsModule],
  providers: [NewsCronService],
})
export class CronModule {}
