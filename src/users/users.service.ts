import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserMapper } from './mapper/user.mapper';
import { UserDto } from './dto/users.dto';

import * as bcrypt from 'bcrypt-nodejs';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userMapper: UserMapper,
  ){}
  
  async resetPassword(userId: number) {
    const userPerson = await this.userRepository.findOne({ 
      where: { id : userId },
      select: { email: true, password: true, id: true}
    });

    userPerson.password = bcrypt.hashSync('123456');
    await this.userRepository.save( userPerson )

    return{
      ok:true,
      message:  "Contraseña actualizada con éxito."
    }
  }

  async enabledDisabledUser(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where :{id}});

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.isActive = !user.isActive;
    await this.userRepository.save(user);
    return user;
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.find({
      relations : ['person']
    });
    return users.map( user => this.userMapper.entityToDTO(user));
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user: User | undefined = await this.userRepository.findOne({where: {id}});
    return user;
  }

}
