import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.cookies['Authentication'];
      const token = authHeader.split(' ')[1];

      this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: 'Not authorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
