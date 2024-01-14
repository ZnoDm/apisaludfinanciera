import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Auth } from 'src/auth/decorators';
import { Tarjeta } from './entities/tarjeta.entity';

@Controller('tarjeta')
export class TarjetaController {
  constructor(private readonly tarjetaService: TarjetaService) {}

  @Get('')
  @Auth()
  findAll() {
    return this.tarjetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarjetaService.findOneById(+id);
  }

  @Post()
  create(@Body() createTarjetaDto: CreateTarjetaDto) {
    return this.tarjetaService.create(createTarjetaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarjetaDto: Partial<Tarjeta>) {
    return this.tarjetaService.update(+id, updateTarjetaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tarjetaService.delete(+id);
  }
}
