import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import CreateUserDto from './dto/user.create.dto';
import User from './user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.createQueryBuilder().where({ email }).getOne();
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  generateFromDto(userDto: DeepPartial<User>): User {
    return this.userRepository.create(userDto);
  }
}
