import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Tarjeta } from './entities/tarjeta.entity';
import { User } from 'src/users/entities/user.entity';
import { BodyRecordatorioDto } from './dto/body-recordatorio.dto';

@Controller('tarjeta')
export class TarjetaController {
  constructor(private readonly tarjetaService: TarjetaService) {}

  @Get('')
  @Auth()
  findAll() {
    return this.tarjetaService.findAll();
  }

  
  @Get(':id')
  findOne(
    @Param('id') id: string
    ) {
    return this.tarjetaService.findOneById(+id);
  }

  @Post()
  @Auth()
  create(
    @GetUser() user: User ,
    @Body() createTarjetaDto: CreateTarjetaDto
  ) {
    return this.tarjetaService.create(user, createTarjetaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarjetaDto: Partial<Tarjeta>) {
    return this.tarjetaService.update(+id, updateTarjetaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tarjetaService.delete(+id);
  }

  @Get(':id/recordatorio/periodos')
  @Auth()
  getPeriodosByTarjeta(
    @Param('id') id: string,
    @GetUser() user: User,
    @Query() query,
  ) {
    return this.tarjetaService.getPeriodosByTarjeta(+id, user, +query.anio);
  }
  @Get(':id/recordatorio/cronograma')
  @Auth()
  getCronogramaByTarjeta(  
    @Param('id') id: string, 
    @GetUser() user: User ,
    @Query() query,
  ) {
    return this.tarjetaService.getCronogramaByTarjeta(+id,user,+query.anio,+query.mes);
  }


  
  @Get('/recordatorio/listar')
  @Auth()
  getTarjetasByPerson(
    @GetUser() user: User ,
  ) {
    return this.tarjetaService.getTarjetasByPerson(user);
  }
 
 
}
