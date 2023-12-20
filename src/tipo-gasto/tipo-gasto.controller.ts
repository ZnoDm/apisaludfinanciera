import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoGastoService } from './tipo-gasto.service';
import { CreateTipoGastoDto } from './dto/create-tipo-gasto.dto';
import { UpdateTipoGastoDto } from './dto/update-tipo-gasto.dto';

@Controller('tipo-gasto')
export class TipoGastoController {
  constructor(private readonly tipoGastoService: TipoGastoService) {}

  @Post()
  create(@Body() createTipoGastoDto: CreateTipoGastoDto) {
    return this.tipoGastoService.create(createTipoGastoDto);
  }

  @Get()
  findAll() {
    return this.tipoGastoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoGastoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoGastoDto: UpdateTipoGastoDto) {
    return this.tipoGastoService.update(+id, updateTipoGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoGastoService.remove(+id);
  }
}
