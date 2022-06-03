import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    if (await this.usersRepository.findOne({ where: { email: user.email } })) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, message: 'Email is already in use' },
        HttpStatus.FORBIDDEN,
      );
    }

    const secureUser = {
      ...user,
      password: await bcrypt.hash(user.password, await bcrypt.genSalt()),
    };
    const newUser = this.usersRepository.create(secureUser);
    await this.usersRepository.save(newUser);
  }

  async signin(user: CreateUserDto) {
    const validUser = await this.validate(user);
    const payload = { username: validUser.email, sub: validUser.id };
    const token = this.jwtService.sign(payload);

    return `Authentication=Bearer ${token}; HttpOnly; Path=/; Max-Age=${
      60 * 60 * 24 * 7
    }`;
  }

  public getCookieForLogOut(): string {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }

  private async validate(user: CreateUserDto): Promise<User> {
    const userData = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!(await bcrypt.compare(user.password, userData.password))) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: 'Wrong credentials' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return userData;
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }

  async findOneByEmail(email: string) {
    const user = this.usersRepository.findOne({ where: { email: email } });
    if (!(await user)) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: 'No such User' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
