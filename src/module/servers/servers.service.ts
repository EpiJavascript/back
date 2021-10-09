import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateServerDto, UpdateServerDto } from './dto';
import UsersService from '../users/users.service';
import { User } from '../users/entities';
import { Server } from './entities';

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
    return this.serversRepository.findOneOrFail(id, {
      relations: ['users'],
    });
  }

  findByEmail(email: string): Promise<Server> {
    return this.serversRepository.createQueryBuilder().where({ email }).getOne();
  }

  async remove(userId: string, id: string): Promise<DeleteResult> {
    const server = await this.serversRepository.findOne({
      where: {
        adminUserId: userId,
        id,
      },
    });
    if (server === undefined) {
      throw new UnauthorizedException();
    }
    return this.serversRepository.delete(id);
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

  async update(userId: string, id: string, updateServerDto: UpdateServerDto): Promise<UpdateResult> {
    const server = await this.serversRepository.findOne({
      where: {
        adminUserId: userId,
        id,
      },
    });
    if (server === undefined) {
      throw new UnauthorizedException();
    }
    return this.serversRepository.update(id, updateServerDto);
  }

  async join(userId: string, id: string): Promise<Server> {
    const server = await this.serversRepository.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });
    if (server === undefined) {
      throw new UnauthorizedException();
    }
    if (server.userIds.includes(userId)) {
      throw new UnauthorizedException(); // already in server
    }
    const user: User = await this.usersService.findOneOrFail(userId);
    server.users.push(user);
    await this.serversRepository.save(server);
    return this.findOneOrFail(id);
  }

  async leave(userId: string, id: string): Promise<void> {
    const server = await this.serversRepository.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });
    if (server === undefined) {
      throw new UnauthorizedException();
    }
    if (!server.userIds.includes(userId)) {
      throw new UnauthorizedException(); // not in server
    }
    const user: User = await this.usersService.findOneOrFail(userId);
    server.users.filter((value: User) => {
      if (value != user) {
        return value;
      }
    });
    await this.serversRepository.save(server);
  }
}
