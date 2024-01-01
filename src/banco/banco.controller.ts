import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { Banco } from './entities/banco.entity';

@Controller('banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Post()
  async create(@Body() createBancoDto: CreateBancoDto): Promise<Banco> {
    return await this.bancoService.create(createBancoDto);
  }

  @Get()
  async findAll(): Promise<Banco[]> {
    return await this.bancoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Banco> {
    const banco = await this.bancoService.findOne(id);
    if (!banco) {
      throw new NotFoundException(`Banco with ID ${id} not found`);
    }
    return banco;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const isDeleted = await this.bancoService.delete(id);
    if (!isDeleted) {
      throw new NotFoundException(`Banco with ID ${id} not found`);
    }
    return { success: true };
  }
}
