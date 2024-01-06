import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Auth, GetUser } from 'src/auth/decorators';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

 
  @Get('')
  @Auth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }




  




  @Put(':id/reset-password')
  resetPassword(@Param('id') id: string) {
    return this.usersService.resetPassword(+id);
  }


  @Put(':id/enabled-disabled')
  enabledDisabledUser(@Param('id') id: number): Promise<any> {
    return this.usersService.enabledDisabledUser(id);
  }

  @Get(':id/roles')
  @Auth()
  async getAllRolesForUserWithFlag(@Param('id') id: number): Promise<any> {
    return await this.usersService.getAllRolesForUser(+id);
  }

  @Put(':userId/roles/:roleId')
  async togglePermisoForRole(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
    @Body('isActive') isActive: boolean,
  ): Promise<any> {
    return this.usersService.toggleRoleForUser(userId, roleId, isActive);
  }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

 





}
