import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import HttpCustomStatus from 'src/common/enums/http-custom-status.enum';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  // Users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['friends', 'servers', 'userTextChannels'],
    });
  }

  public findOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['friends', 'servers'],
    });
  }

  findByIds(ids: string[], relations = []): Promise<User[]> {
    return this.usersRepository.findByIds(ids, {
      relations,
    });
  }

  findByEmail(email: string, includePassword = false): Promise<User> {
    return this.usersRepository.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(includePassword ? 'user.password' : undefined)
      .getOne();
  }

  remove(userId: string, id: string): Promise<DeleteResult> {
    if (userId != id) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.delete(id);
  }

  update(userId: string, id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    if (userId != id) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.update(id, updateUserDto);
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
      throw new HttpException('email_already_taken', HttpCustomStatus.EMAIL_ALREADY_TAKEN);
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

  // Friends
  async findAllFriends(userId: string): Promise<User[]> {
    const user: User = await this.usersRepository.findOneOrFail(userId, {
      relations: ['friends'],
    });
    return user.friends;
  }

  async removeFriend(userId: string, otherId: string): Promise<void> {
    const otherUser: User = await this.usersRepository.findOneOrFail(otherId, {
      relations: ['friends'],
    });
    const user: User = await this.usersRepository.findOneOrFail(userId, {
      relations: ['friends'],
    });

    // checkf if user is friend with other user
    if (!user.friendIds.includes(otherId)) {
      throw new HttpException('not_friend_with_user', HttpCustomStatus.NOT_FRIEND_WITH_USER);
    }

    user.friends = user.friends.filter((val: User) => {
      return val.id != otherId;
    });
    otherUser.friends = otherUser.friends.filter((val: User) => {
      return val.id != userId;
    });

    await this.usersRepository.save(otherUser);
    await this.usersRepository.save(user);
  }
}