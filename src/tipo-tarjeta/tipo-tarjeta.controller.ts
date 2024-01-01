import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoTarjetaService } from './tipo-tarjeta.service';
import { CreateTipoTarjetaDto } from './dto/create-tipo-tarjeta.dto';
import { UpdateTipoTarjetaDto } from './dto/update-tipo-tarjeta.dto';

@Controller('tipo-tarjeta')
export class TipoTarjetaController {
  constructor(private readonly tipoTarjetaService: TipoTarjetaService) {}

  @Post()
  create(@Body() createTipoTarjetaDto: CreateTipoTarjetaDto) {
    return this.tipoTarjetaService.create(createTipoTarjetaDto);
  }

  @Get()
  findAll() {
    return this.tipoTarjetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoTarjetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoTarjetaDto: UpdateTipoTarjetaDto) {
    return this.tipoTarjetaService.update(+id, updateTipoTarjetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoTarjetaService.remove(+id);
  }
}
