import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseType } from 'src/common/types/responce.type';
import { User as UserDecorator } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { UpdateCategoriesDto, updateCategoriesSchema } from './dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOne(@UserDecorator() user: User): ResponseType<User> {
    return { data: user, message: 'User fetched successfully' };
  }

  @Patch()
  async updateCategories(
    @UserDecorator() user: User,
    @Body(new ZodValidationPipe(updateCategoriesSchema))
    updateCategoriesDto: UpdateCategoriesDto,
  ): Promise<ResponseType<User>> {
    console.log(updateCategoriesDto);
    const result = await this.usersService.updateCategories(
      user.id,
      updateCategoriesDto,
    );

    return { data: result, message: 'Categories updated successfully' };
  }

  @Patch('me')
  async softDeleteUSer(
    @UserDecorator() user: User,
  ): Promise<ResponseType<null>> {
    await this.usersService.softDeleteUser(user.id);

    return { message: 'User deleted successfully' };
  }
}
