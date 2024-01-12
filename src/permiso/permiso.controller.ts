import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Permiso } from './entities/permiso.entity';
import { Auth } from 'src/auth/decorators';

@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  
  @Get('')
  @Auth()
  findAll() {
    return this.permisoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisoService.findOneById(+id);
  }

  @Post()
  create(@Body() createPermisoDto: Partial<Permiso>) {
    return this.permisoService.create(createPermisoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermisoDto: Partial<Permiso>) {
    return this.permisoService.update(+id, updatePermisoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.permisoService.delete(+id);
  }
}
