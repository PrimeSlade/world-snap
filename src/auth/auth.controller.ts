import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import {
  createUserSchema,
  type CreateUserDto,
} from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const createdUser = await this.authService.register(createUserDto);

    const { password, ...result } = createdUser;

    return result;
  }
}
