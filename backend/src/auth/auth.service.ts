import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { comparePassword, hashPassword } from 'src/common/helpers/hahs.helper';
import { PrismaService } from 'src/prisma.service';
import { SignInDto } from './dto/sigin-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;

    return result;
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: signInDto.email,
      },
    });

    const verfifyPassword = await comparePassword(
      signInDto.password,
      user.password,
    );

    if (!verfifyPassword)
      throw new UnauthorizedException('Password is incorrect');

    const payload = { userId: user.id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
