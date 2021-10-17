import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const headers = request.headers as unknown as Record<string, string>;
    const authorization = headers.authorization;
    if (authorization === undefined) {
      return false;
    }
    const token: string = authorization.split(' ')[1];
    if (token === undefined) {
      return false;
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch {
      return false;
    }
    return true;
  }
}
