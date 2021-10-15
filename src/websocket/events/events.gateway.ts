import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import JwtPayloadInterface from 'src/common/interfaces/jwt-payload';
import { WsPayload } from '../decorators/ws-payload.decorator';
import { WsGuard } from '../guards/ws.guard';
 
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number, @WsPayload() jwtPayload: JwtPayloadInterface): Promise<number> {
    console.log(jwtPayload);
    return data;
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('connect', socket.id);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}