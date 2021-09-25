import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneOrFail(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(createUserDto);
    // check if user.email is already in use to avoid 500 duplicate key (400 better)
    return this.userRepository.save(user);
  }
}
