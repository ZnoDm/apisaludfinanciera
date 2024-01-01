import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProveedorTarjetaService } from './proveedor-tarjeta.service';
import { CreateProveedorTarjetaDto } from './dto/create-proveedor-tarjeta.dto';
import { UpdateProveedorTarjetaDto } from './dto/update-proveedor-tarjeta.dto';
import { ProveedorTarjeta } from './entities/proveedor-tarjeta.entity';

@Controller('proveedor-tarjeta')
export class ProveedorTarjetaController {
  constructor(private readonly proveedorTarjetaService: ProveedorTarjetaService) {}

  @Post()
  async create(@Body() createProveedorTarjetaDto: CreateProveedorTarjetaDto): Promise<ProveedorTarjeta> {
    return await this.proveedorTarjetaService.create(createProveedorTarjetaDto);
  }

  @Get()
  async findAll(): Promise<ProveedorTarjeta[]> {
    return await this.proveedorTarjetaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProveedorTarjeta> {
    const proveedorTarjeta = await this.proveedorTarjetaService.findOne(id);
    if (!proveedorTarjeta) {
      throw new NotFoundException(`Proveedor de Tarjeta with ID ${id} not found`);
    }
    return proveedorTarjeta;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ success: boolean }> {
    const isDeleted = await this.proveedorTarjetaService.delete(id);
    if (!isDeleted) {
      throw new NotFoundException(`Proveedor de Tarjeta with ID ${id} not found`);
    }
    return { success: true };
  }
}
