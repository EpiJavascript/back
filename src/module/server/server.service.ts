import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Server from './server.entity';
import CreateServerDto from './dto/server.create.dto';
import UserService from '../user/user.service';
import User from '../user/user.entity';

@Injectable()
export default class ServerService {
  constructor(
    @InjectRepository(Server)
    private serverRepository: Repository<Server>,
    private userService: UserService,
  ) {
    this.serverRepository = serverRepository;
  }

  async findAll(userId: string): Promise<Server[]> {
    return this.serverRepository
      .createQueryBuilder('server')
      .leftJoin('server.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  findOne(id: string): Promise<Server> {
    return this.serverRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<Server> {
    return this.serverRepository.findOneOrFail(id);
  }

  findByEmail(email: string): Promise<Server> {
    return this.serverRepository.createQueryBuilder().where({ email }).getOne();
  }

  async remove(userId: string, id: string): Promise<void> {
    const server = await this.serverRepository.findOne({
      where: {
        adminUserId: userId,
        id: id,
      },
    });
    if (server === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.serverRepository.delete(id);
  }

  async create(userId: string, createServerDto: CreateServerDto): Promise<Server> {
    const user: User = await this.userService.findOneOrFail(userId);
    const server: Server = this.serverRepository.create({
      ...createServerDto,
      adminUserId: userId,
      createdBy: userId,
      lastUpdatedBy: userId,
      users: [user], // new server, only 1 user
    });
    return this.serverRepository.save(server);
  }
}
