import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import JwtPayloadInterface from '../../common/interfaces/jwt-payload';
import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

/**
 * Only use this Decorator on routes using auth Guard
 * This Decorator needs a valid Bearer token in request header
 */
export const WsPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const authorization: string = ctx.getArgByIndex<Socket>(0).handshake.headers.authorization;
    const token: string = authorization.split(' ')[1];
    console.log(token);
    const paylod: JwtPayloadInterface = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadInterface;
    return paylod;
  },
);