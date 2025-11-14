import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import {
  createUserSchema,
  type CreateUserDto,
} from 'src/users/dto/create-user.dto';
import { type SignInDto, signInSchema } from './dto/sigin-auth.dto';
import type { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.authService.register(createUserDto);

    return user;
  }

  @Post('signin')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const access_token = await this.authService.signIn(signInDto);

    response.cookie('world_snap_user', access_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    });

    return 'Successfully logged in';
  }
}
