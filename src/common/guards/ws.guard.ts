import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const authorization: string = context.getArgByIndex<Socket>(0).handshake.headers.authorization;
    if (authorization === undefined) {
      return false;
    }
    const bearerToken: string = authorization.split(' ')[1];
    try {
      jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
      return true;
    } catch {
      return false;
    }
  }
}
