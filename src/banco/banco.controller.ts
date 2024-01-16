import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { Banco } from './entities/banco.entity';
import { Auth } from 'src/auth/decorators';

@Controller('banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}


  @Get('/listar')
  @Auth()
  getListar() {
    return this.bancoService.getListar();
  }
 
  @Get('')
  @Auth()
  findAll() {
    return this.bancoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancoService.findOneById(+id);
  }

  @Post()
  create(@Body() createBancoDto: Partial<Banco>) {
    return this.bancoService.create(createBancoDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBancoDto: Partial<Banco>) {
    return this.bancoService.update(+id, updateBancoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bancoService.delete(+id);
  }
 

}
