import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import { FetchByCursorDto, fetchByCursorSchema } from './dto/query-news.dto';
import { User as UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { NewsProcessor } from './news.processor';
import { SummerizeNewDto } from './dto/summerize-news.dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly newsProcessor: NewsProcessor,
  ) {}

  @Post(':id/summarize')
  async summarizeNew(
    @Body() summerizeNewDto: SummerizeNewDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const summerizedVersion =
      await this.newsProcessor.summarize(summerizeNewDto);

    console.log(summerizedVersion);
  }

  @Get()
  async getNews(
    @Query(new ZodValidationPipe(fetchByCursorSchema)) query: FetchByCursorDto,
    @UserDecorator() user: User,
  ) {
    const { cursor, take } = query;

    let news: any = null;

    const { data, nextCursor, hasNextPage } =
      await this.newsService.getNewsByCursor({
        cursor,
        take,
        categories: user.categories,
      });

    news = data;

    return {
      data: news,
      message: 'News successfully fetched',
      pagination: {
        nextCursor,
        hasNextPage,
      },
    };
  }
}
