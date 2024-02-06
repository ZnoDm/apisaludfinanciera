import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { MetaService } from './meta.service';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { Meta } from './entities/meta.entity';
import { Auth } from 'src/auth/decorators';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}


  @Get('/listar')
  @Auth()
  getListar() {
    return this.metaService.getListar();
  }
 
  @Get('')
  @Auth()
  findAll() {
    return this.metaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metaService.findOneById(+id);
  }

  @Post()
  create(@Body() createMetaDto: Partial<Meta>) {
    return this.metaService.create(createMetaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetaDto: Partial<Meta>) {
    return this.metaService.update(+id, updateMetaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.metaService.delete(+id);
  }
 

}
