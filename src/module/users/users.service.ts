import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateUserDto from './dto/user.create.dto';
import User from './entities/user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.usersRepository = usersRepository;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(userId: string | null, createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.usersRepository.create({
      ...createUserDto,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    // Check if email is already taken
    const duplicateUser: User = await this.usersRepository.findOne({ email: createUserDto.email });
    if (duplicateUser) {
      throw new HttpException('email already taken', HttpStatus.CONFLICT);
    }

    // Set createBy and lastUpdatedBy properly
    const newUser: User = await this.usersRepository.save(user);
    if (newUser.createdBy == null) {
      newUser.createdBy = newUser.id;
      newUser.lastUpdatedBy = newUser.id;
      return this.usersRepository.save({
        id: newUser.id,
        ...newUser,
      });
    }
    return newUser;
  }
}
