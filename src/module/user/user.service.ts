import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneOrFail(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(userId: string | null, createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create({
      ...createUserDto,
      createdBy: userId,
      lastUpdatedBy: userId,
    });
    // Check if email is already taken
    const duplicateUser: User = await this.userRepository.findOne({ email: createUserDto.email });
    if (duplicateUser) {
      throw new HttpException('email already taken', HttpStatus.CONFLICT);
    }

    // Set createBy and lastUpdatedBy properly
    const newUser: User = await this.userRepository.save(user);
    if (newUser.createdBy == null) {
      newUser.createdBy = newUser.id;
      newUser.lastUpdatedBy = newUser.id;
      return this.userRepository.save({
        id: newUser.id,
        ...newUser,
      });
    }
    return newUser;
  }
}
