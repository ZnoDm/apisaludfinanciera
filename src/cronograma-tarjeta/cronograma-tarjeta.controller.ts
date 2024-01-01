import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronogramaTarjetaService } from './cronograma-tarjeta.service';
import { CreateCronogramaTarjetaDto } from './dto/create-cronograma-tarjeta.dto';
import { UpdateCronogramaTarjetaDto } from './dto/update-cronograma-tarjeta.dto';

@Controller('cronograma-tarjeta')
export class CronogramaTarjetaController {
  constructor(private readonly cronogramaTarjetaService: CronogramaTarjetaService) {}

  @Post()
  create(@Body() createCronogramaTarjetaDto: CreateCronogramaTarjetaDto) {
    return this.cronogramaTarjetaService.create(createCronogramaTarjetaDto);
  }

  @Get()
  findAll() {
    return this.cronogramaTarjetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cronogramaTarjetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCronogramaTarjetaDto: UpdateCronogramaTarjetaDto) {
    return this.cronogramaTarjetaService.update(+id, updateCronogramaTarjetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cronogramaTarjetaService.remove(+id);
  }
}
