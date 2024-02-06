import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoGastoService } from './tipo-gasto.service';
import { CreateTipoGastoDto } from './dto/create-tipo-gasto.dto';
import { UpdateTipoGastoDto } from './dto/update-tipo-gasto.dto';
import { TipoGasto } from './entities/tipo-gasto.entity';
import { Auth } from 'src/auth/decorators';

@Controller('tipo-gasto')
export class TipoGastoController {
  constructor(private readonly tipoGastoService: TipoGastoService) {}


  @Get('/listar')
  @Auth()
  getListar() {
    return this.tipoGastoService.getListar();
  }
 
  @Get('')
  @Auth()
  findAll() {
    return this.tipoGastoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoGastoService.findOneById(+id);
  }

  @Post()
  create(@Body() createTipoGastoDto: Partial<TipoGasto>) {
    return this.tipoGastoService.create(createTipoGastoDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoGastoDto: Partial<TipoGasto>) {
    return this.tipoGastoService.update(+id, updateTipoGastoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tipoGastoService.delete(+id);
  }
}
