import { Injectable } from '@nestjs/common';
import { CreateProveedorTarjetaDto } from './dto/create-proveedor-tarjeta.dto';
import { UpdateProveedorTarjetaDto } from './dto/update-proveedor-tarjeta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorTarjeta } from './entities/proveedor-tarjeta.entity';

@Injectable()
export class ProveedorTarjetaService {
  constructor(
    @InjectRepository(ProveedorTarjeta)
    private readonly proveedorTarjetaRepository: Repository<ProveedorTarjeta>,
  ) {}

  async create(createProveedorTarjetaDto: CreateProveedorTarjetaDto): Promise<ProveedorTarjeta> {
    const proveedorTarjeta = this.proveedorTarjetaRepository.create(createProveedorTarjetaDto);
    return await this.proveedorTarjetaRepository.save(proveedorTarjeta);
  }

  async findAll(): Promise<ProveedorTarjeta[]> {
    return await this.proveedorTarjetaRepository.find();
  }

  async findOne(id: number): Promise<ProveedorTarjeta | undefined> {
    return await this.proveedorTarjetaRepository.findOne({where:{id}});
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.proveedorTarjetaRepository.delete(id);
    return deleteResult.affected !== 0;
  }
}
