import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where({ email: email })
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  create(createUserDto: CreateUserDto) {
    const user: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  generateFromDto(userDto: DeepPartial<User>): User {
    return this.userRepository.create(userDto);
  }
}
