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

  async findAll() : Promise<ProveedorTarjeta[]> {
    const proveedorTarjetas: ProveedorTarjeta[] = await this.proveedorTarjetaRepository.find();
    return proveedorTarjetas;
  }
  async findOneById(id: number): Promise<ProveedorTarjeta | undefined> {
    const proveedorTarjeta: ProveedorTarjeta | undefined = await this.proveedorTarjetaRepository.findOne({where: {id}});
    return proveedorTarjeta;
  }

  async create(proveedorTarjetaData: Partial<ProveedorTarjeta>): Promise<any> {
    const newProveedorTarjeta: ProveedorTarjeta = await this.proveedorTarjetaRepository.create(proveedorTarjetaData);
    const savedProveedorTarjeta: ProveedorTarjeta = await this.proveedorTarjetaRepository.save(newProveedorTarjeta);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedProveedorTarjeta
    };
  }

  async update(id: number, proveedorTarjetaData: Partial<ProveedorTarjeta>): Promise<any> {
    await this.proveedorTarjetaRepository.update(id, proveedorTarjetaData);
    const updatedProveedorTarjeta: ProveedorTarjeta | undefined = await this.proveedorTarjetaRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedProveedorTarjeta
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.proveedorTarjetaRepository.delete(id);
    if(deleteResult.affected !== 0){
      return {
        ok: true,
        message : `El id: ${id} fue eliminado con éxito`
      }
    }else{
      return {
        ok: false,
        message : `No hubo coicidencias`
      }
    }
  }

  async getListar() {
    const proveedorTarjetas: ProveedorTarjeta[] = await this.proveedorTarjetaRepository.find(
      {select: { id: true, nombre:true }}
    );
    return proveedorTarjetas;
  }
}
