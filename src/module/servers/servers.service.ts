import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UsersService from 'src/module/users/users.service';
import User from 'src/module/users/entities/user.entity';
import CreateServerDto from './dto/server.create.dto';
import Server from './entities/server.entity';

@Injectable()
export default class ServersService {
  constructor(
    @InjectRepository(Server)
    private serversRepository: Repository<Server>,
    private usersService: UsersService,
  ) { }

  async findAll(userId: string): Promise<Server[]> {
    return this.serversRepository
      .createQueryBuilder('server')
      .leftJoin('server.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  findOne(id: string): Promise<Server> {
    return this.serversRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<Server> {
    return this.serversRepository.findOneOrFail(id);
  }

  findByEmail(email: string): Promise<Server> {
    return this.serversRepository.createQueryBuilder().where({ email }).getOne();
  }

  async remove(userId: string, id: string): Promise<void> {
    const server = await this.serversRepository.findOne({
      where: {
        adminUserId: userId,
        id,
      },
    });
    if (server === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.serversRepository.delete(id);
  }

  async create(userId: string, createServerDto: CreateServerDto): Promise<Server> {
    const user: User = await this.usersService.findOneOrFail(userId);
    const server: Server = this.serversRepository.create({
      ...createServerDto,
      adminUserId: userId,
      createdBy: userId,
      lastUpdatedBy: userId,
      users: [user], // new server, only 1 user
    });
    return this.serversRepository.save(server);
  }
}
