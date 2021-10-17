import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import JwtPayloadInterface from '../interfaces/jwt-payload';
import * as jwt from 'jsonwebtoken';

/**
 * Only use this Decorator on routes using auth Guard
 * This Decorator needs a valid Bearer token in request header
 */
export const Payload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const headers = request.headers as unknown as Record<string, string>;
    const authorization = headers.authorization;
    const token: string = authorization.split(' ')[1];
    const paylod: JwtPayloadInterface = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadInterface;
    return paylod;
  },
);