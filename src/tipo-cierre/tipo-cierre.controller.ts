import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TipoCierreService } from './tipo-cierre.service';
import { CreateTipoCierreDto } from './dto/create-tipo-cierre.dto';
import { UpdateTipoCierreDto } from './dto/update-tipo-cierre.dto';
import { TipoCierre } from './entities/tipo-cierre.entity';

@Controller('tipo-cierre')
export class TipoCierreController {
  constructor(private readonly tipoCierreService: TipoCierreService) {}
  @Post()
  async create(@Body() createTipoCierreDto: CreateTipoCierreDto): Promise<TipoCierre> {
    return await this.tipoCierreService.create(createTipoCierreDto);
  }

  @Get()
  async findAll(): Promise<TipoCierre[]> {
    return await this.tipoCierreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TipoCierre> {
    const tipoCierre = await this.tipoCierreService.findOne(id);
    if (!tipoCierre) {
      throw new NotFoundException(`TipoCierre with ID ${id} not found`);
    }
    return tipoCierre;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const isDeleted = await this.tipoCierreService.delete(id);
    if (!isDeleted) {
      throw new NotFoundException(`TipoCierre with ID ${id} not found`);
    }
    return { success: true };
  }
}
