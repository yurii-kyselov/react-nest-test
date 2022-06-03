import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { log } from 'util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }

  @Post('signin')
  async signin(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Res() res,
  ) {
    const cookie = await this.usersService.signin(createUserDto);
    res.setHeader('Set-Cookie', cookie);
    return res.end();
  }

  @Get('/check')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  check(@Res() res) {
    return res.end();
  }

  @Get('/signout')
  @UseGuards(JwtAuthGuard)
  async signout(@Res() res): Promise<void> {
    const cookie = this.usersService.getCookieForLogOut();
    res.setHeader('Set-Cookie', cookie);
    return res.end();
  }
}
