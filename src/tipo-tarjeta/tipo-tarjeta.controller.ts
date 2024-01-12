import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoTarjetaService } from './tipo-tarjeta.service';
import { CreateTipoTarjetaDto } from './dto/create-tipo-tarjeta.dto';
import { UpdateTipoTarjetaDto } from './dto/update-tipo-tarjeta.dto';
import { Auth } from 'src/auth/decorators';
import { TipoTarjeta } from './entities/tipo-tarjeta.entity';

@Controller('tipo-tarjeta')
export class TipoTarjetaController {
  constructor(private readonly tipoTarjetaService: TipoTarjetaService) {}
  @Get('')
  @Auth()
  findAll() {
    return this.tipoTarjetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoTarjetaService.findOneById(+id);
  }

  @Post()
  create(@Body() createTipoTarjetaDto: Partial<TipoTarjeta>) {
    return this.tipoTarjetaService.create(createTipoTarjetaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoTarjetaDto: Partial<TipoTarjeta>) {
    return this.tipoTarjetaService.update(+id, updateTipoTarjetaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tipoTarjetaService.delete(+id);
  }
}
