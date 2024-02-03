import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Cuenta } from './entities/cuenta.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import { CreateCuentaGastoDto } from './dto/create-cuenta-gasto.dto';

@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {}

  @Get('/grafico/donaHistorial')
  @Auth()
  donaHistorial(
    @GetUser() user: User 
  ) {
    return this.cuentaService.donaHistorial(user);
  }
  
  @Get('/listar')
  @Auth()
  getListar() {
    return this.cuentaService.getListar();
  }
  @Get(':id/historial')
  @Auth()
  getHistoriaCuentaByPerson(
    @GetUser() user: User ,
    @Param('id') id: string) {
    return this.cuentaService.getHistoriaCuentaByPerson(+id,user);
  }

  @Get('/listar/user')
  @Auth()
  findAllByUser(
    @GetUser() user: User ,
  ) {
    return this.cuentaService.findAllByUser(user);
  }

  @Get('/resumen/user')
  @Auth()
  getResumenGastoByPerson(
    @GetUser() user: User ,
  ) {
    return this.cuentaService.getResumenGastoByPerson(user);
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
  @Auth()
  create(
    @GetUser() user: User ,
    @Body() createCuentaDto: Partial<CreateCuentaDto>) {
    return this.cuentaService.create(user, createCuentaDto);
  }
  @Post('/gasto/add')
  @Auth()
  createCuentaGasto(
    @GetUser() user: User ,
    @Body() createCuentaGastoDto: Partial<CreateCuentaGastoDto>) {
    return this.cuentaService.addGasto(user, createCuentaGastoDto);
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
