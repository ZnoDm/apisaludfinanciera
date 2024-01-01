import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Auth } from 'src/auth/decorators';
import { Role } from './entities/rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  
  @Get('')
  @Auth()
  findAll() {
    return this.rolService.findAll();
  }

  @Post()
  @Auth()
  create(@Body() createRolDto: Partial<Role>) {
    return this.rolService.create(createRolDto);
  }

  @Get(':id/permissions')
  @Auth()
  async getAllPermissionsForRoleWithFlag(@Param('id') id: number): Promise<any> {
    return await this.rolService.getAllPermissionsForRole(+id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: Partial<Role>) {
    return this.rolService.update(+id, updateRolDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rolService.delete(+id);
  }

  @Put(':roleId/permissions/:permissionId')
  async togglePermissionForRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
    @Body('isActive') isActive: boolean,
  ): Promise<any> {
    return this.rolService.togglePermissionForRole(roleId, permissionId, isActive);
  }

}
