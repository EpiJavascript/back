import JwtPayloadInterface from '../interfaces/jwt-payload';
import { Injectable, PipeTransform } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class GetJwtPipe implements PipeTransform {
  transform(token: string): JwtPayloadInterface {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayloadInterface;
  }
}