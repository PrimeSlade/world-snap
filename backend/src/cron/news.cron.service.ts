import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewsService } from 'src/news/news.service';

@Injectable()
export class NewsCronService {
  private readonly logger = new Logger(NewsCronService.name);

  constructor(private readonly newsService: NewsService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    this.logger.debug('Call every 30 min');

    //fetch
    const news = await this.newsService.fetchNews();

    //insert
    await this.newsService.insertNews(news.results);
  }
}
