import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProveedorTarjetaService } from './proveedor-tarjeta.service';
import { CreateProveedorTarjetaDto } from './dto/create-proveedor-tarjeta.dto';
import { UpdateProveedorTarjetaDto } from './dto/update-proveedor-tarjeta.dto';
import { ProveedorTarjeta } from './entities/proveedor-tarjeta.entity';
import { Auth } from 'src/auth/decorators';

@Controller('proveedor-tarjeta')
export class ProveedorTarjetaController {
  constructor(private readonly proveedorTarjetaService: ProveedorTarjetaService) {}
  
  @Get('')
  @Auth()
  findAll() {
    return this.proveedorTarjetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorTarjetaService.findOneById(+id);
  }

  @Post()
  create(@Body() createProveedorTarjetaDto: Partial<ProveedorTarjeta>) {
    return this.proveedorTarjetaService.create(createProveedorTarjetaDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProveedorTarjetaDto: Partial<ProveedorTarjeta>) {
    return this.proveedorTarjetaService.update(+id, updateProveedorTarjetaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.proveedorTarjetaService.delete(+id);
  }
}
