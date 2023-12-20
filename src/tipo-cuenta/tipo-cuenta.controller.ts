import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCuentaService } from './tipo-cuenta.service';
import { CreateTipoCuentaDto } from './dto/create-tipo-cuenta.dto';
import { UpdateTipoCuentaDto } from './dto/update-tipo-cuenta.dto';

@Controller('tipo-cuenta')
export class TipoCuentaController {
  constructor(private readonly tipoCuentaService: TipoCuentaService) {}

  @Post()
  create(@Body() createTipoCuentaDto: CreateTipoCuentaDto) {
    return this.tipoCuentaService.create(createTipoCuentaDto);
  }

  @Get()
  findAll() {
    return this.tipoCuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCuentaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCuentaDto: UpdateTipoCuentaDto) {
    return this.tipoCuentaService.update(+id, updateTipoCuentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoCuentaService.remove(+id);
  }
}
