import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronogramaTarjetaService } from './cronograma-tarjeta.service';
import { CreateCronogramaTarjetaDto } from './dto/create-cronograma-tarjeta.dto';
import { UpdateCronogramaTarjetaDto } from './dto/update-cronograma-tarjeta.dto';
import { Auth } from 'src/auth/decorators';
import { CronogramaTarjeta } from './entities/cronograma-tarjeta.entity';

@Controller('cronograma-tarjeta')
export class CronogramaTarjetaController {
  constructor(private readonly cronogramaTarjetaService: CronogramaTarjetaService) {}
  @Get('')
  @Auth()
  findAll() {
    return this.cronogramaTarjetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cronogramaTarjetaService.findOneById(+id);
  }

  @Post()
  create(@Body() createCronogramaTarjetaDto: Partial<CronogramaTarjeta>) {
    return this.cronogramaTarjetaService.create(createCronogramaTarjetaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCronogramaTarjetaDto: Partial<CronogramaTarjeta>) {
    return this.cronogramaTarjetaService.update(+id, updateCronogramaTarjetaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cronogramaTarjetaService.delete(+id);
  }
}
