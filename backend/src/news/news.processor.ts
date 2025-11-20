import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import { SummerizeNewDto } from './dto/summerize-news.dto';

@Injectable()
export class NewsProcessor {
  constructor(private configService: ConfigService) {}

  async summarize(summerizeNewDto: SummerizeNewDto) {
    const ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert news analyst. Read the content from the following URL: ${summerizeNewDto.url}. Write a high-quality, detailed summary of the news article in clear, fluent English. The summary should capture all key points, context, background information, and implications. Do not use bullet points or lists; instead, present the summary in cohesive, well-structured paragraphs. Ensure the writing is neutral, accurate, and easy to understand, suitable for someone who hasn’t read the original article.s`,
    });

    return response.text;
  }
}
