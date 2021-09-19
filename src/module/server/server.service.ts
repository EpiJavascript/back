import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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

  findAll(): Promise<Server[]> {
    return this.serverRepository.find();
  }

  findOne(id: string): Promise<Server> {
    return this.serverRepository.findOne(id);
  }

  findByEmail(email: string): Promise<Server> {
    return this.serverRepository.createQueryBuilder().where({ email }).getOne();
  }

  async remove(id: string): Promise<void> {
    await this.serverRepository.delete(id);
  }

  generateFromDto(ServerDto: DeepPartial<Server>): Server {
    return this.serverRepository.create(ServerDto);
  }

  async create(userId: number, createServerDto: CreateServerDto): Promise<Server> {
    const user: User = await this.userService.findOne(userId);
    const server: Server = this.serverRepository.create({
      ...createServerDto,
      user: user,
    });
    return this.serverRepository.save(server);
  }
}
