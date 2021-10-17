import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';

import JwtPayloadInterface from '../common/interfaces/jwt-payload';
import { WsGuard } from '../common/guards/ws.guard';

function getJwtPayloadFromSocket(socket: Socket) {
  const authorization: string = socket.handshake.headers.authorization;
  const token: string = authorization.split(' ')[1];
  const paylod: JwtPayloadInterface = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadInterface;
  return paylod;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;
  
  private connected: Map<string, Socket> = new Map<string, Socket>();

  @UseGuards(WsGuard)
  handleConnection(@ConnectedSocket() socket: Socket): void {
    const jwtPayload: JwtPayloadInterface = getJwtPayloadFromSocket(socket);
    this.connected.delete(jwtPayload.userId);
    this.connected.set(jwtPayload.userId, socket);
  }

  @UseGuards(WsGuard)
  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    const jwtPayload: JwtPayloadInterface = getJwtPayloadFromSocket(socket);
    this.connected.delete(jwtPayload.userId);
  }

  public getConnected(): Map<string, Socket> {
    return this.connected;
  }

  public send(socket: Socket, message: string, payload: unknown): void {
    socket.emit(message, payload);
  }
}