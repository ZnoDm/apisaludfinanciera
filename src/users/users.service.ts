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
import { Role } from 'src/rol/entities/rol.entity';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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


  async getAllRolesForUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: {id}, relations: ['roles'] });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const allRoles = await this.roleRepository.find();

    const roles = allRoles.map((rol) => {
      const isActive = user.roles.some((r) => r.id === rol.id);
      return {
        ...rol,
        active: isActive,
      };
    });
    return roles;
  }

  async toggleRoleForUser(userId: number, roleId: number, isActive: boolean): Promise<any> {

    const user = await this.userRepository.findOne({ where: { id : userId },  relations: ['roles'] });
    const role = await this.roleRepository.findOne( { where : { id: roleId} });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

  
    const existingRolIndex = user.roles.findIndex((p) => p.id == roleId);
    if (isActive && existingRolIndex === -1) {
      user.roles.push(role);
    } else if (!isActive && existingRolIndex !== -1) {
      console.log(isActive )
      console.log( existingRolIndex)
      user.roles.splice(existingRolIndex, 1);
    }
    
    await this.userRepository.save(user);
    return {
      ok: true,
      user
    }
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
