import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Cuenta } from './entities/cuenta.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {}


  @Get('/listar')
  @Auth()
  getListar() {
    return this.cuentaService.getListar();
  }
 
  @Get('')
  @Auth()
  findAll() {
    return this.cuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaService.findOneById(+id);
  }

  @Post()
  create(
    @GetUser() user: User ,
    @Body() createCuentaDto: Partial<CreateCuentaDto>) {
    return this.cuentaService.create(user, createCuentaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaDto: Partial<Cuenta>) {
    return this.cuentaService.update(+id, updateCuentaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cuentaService.delete(+id);
  }
 

}
