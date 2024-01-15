import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TipoCierreService } from './tipo-cierre.service';
import { CreateTipoCierreDto } from './dto/create-tipo-cierre.dto';
import { UpdateTipoCierreDto } from './dto/update-tipo-cierre.dto';
import { TipoCierre } from './entities/tipo-cierre.entity';
import { Auth } from 'src/auth/decorators';

@Controller('tipo-cierre')
export class TipoCierreController {
  constructor(private readonly tipoCierreService: TipoCierreService) {}
  @Get('')
  @Auth()
  findAll() {
    return this.tipoCierreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCierreService.findOneById(+id);
  }

  @Post()
  create(@Body() createTipoCierreDto: Partial<TipoCierre>) {
    return this.tipoCierreService.create(createTipoCierreDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCierreDto: Partial<TipoCierre>) {
    return this.tipoCierreService.update(+id, updateTipoCierreDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tipoCierreService.delete(+id);
  }

  @Get('listar')
  @Auth()
  getListar() {
    return this.tipoCierreService.getListar();
  }
}
