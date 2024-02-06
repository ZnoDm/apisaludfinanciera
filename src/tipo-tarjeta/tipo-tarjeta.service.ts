import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoTarjetaDto } from './dto/create-tipo-tarjeta.dto';
import { UpdateTipoTarjetaDto } from './dto/update-tipo-tarjeta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoTarjeta } from './entities/tipo-tarjeta.entity';
import { Repository } from 'typeorm';
import { Banco } from '../banco/entities/banco.entity';
import { ProveedorTarjeta } from 'src/proveedor-tarjeta/entities/proveedor-tarjeta.entity';

@Injectable()
export class TipoTarjetaService {

  constructor(
    @InjectRepository(TipoTarjeta)
    private readonly tipoTarjetaRepository: Repository<TipoTarjeta>,
    @InjectRepository(Banco)
    private readonly bancoRepository: Repository<Banco>,
    @InjectRepository(ProveedorTarjeta)
    private readonly proveedorTarjetaRepository: Repository<ProveedorTarjeta>,
  ) {}
  
  async findAll() : Promise<TipoTarjeta[]> {
    const tipoTarjetas: TipoTarjeta[] = await this.tipoTarjetaRepository.find();
    return tipoTarjetas;
  }
  async findOneById(id: number): Promise<TipoTarjeta | undefined> {
    const tipoTarjeta: TipoTarjeta | undefined = await this.tipoTarjetaRepository.findOne({where: {id}});
    return tipoTarjeta;
  }

  async create(tipoTarjetaData: Partial<TipoTarjeta>): Promise<any> {
    const newTipoTarjeta: TipoTarjeta = await this.tipoTarjetaRepository.create(tipoTarjetaData);
    const savedTipoTarjeta: TipoTarjeta = await this.tipoTarjetaRepository.save(newTipoTarjeta);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedTipoTarjeta
    };
  }

  async update(id: number, tipoTarjetaData: Partial<TipoTarjeta>): Promise<any> {
    await this.tipoTarjetaRepository.update(id, tipoTarjetaData);
    const updatedTipoTarjeta: TipoTarjeta | undefined = await this.tipoTarjetaRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedTipoTarjeta
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.tipoTarjetaRepository.delete(id);
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

  async getListar(bancoId,proveedorTarjetaId) {
    console.log(bancoId,proveedorTarjetaId);

    const banco = await this.bancoRepository.findOne({where : {id:bancoId}});
    if (!banco) {
      throw new NotFoundException(`Banco with ID ${bancoId} not found`);
    }
    const proveedorTarjeta = await this.proveedorTarjetaRepository.findOne({where : {id: proveedorTarjetaId} });
    if (!proveedorTarjeta) {
      throw new NotFoundException(`ProveedorTarjeta with ID ${proveedorTarjetaId} not found`);
    }

    const tipoTarjetas: TipoTarjeta[] = await this.tipoTarjetaRepository.find({
      where: { banco: {id: banco.id},proveedorTarjeta:{id:proveedorTarjeta.id}},
      select: { id: true, nombre: true },
      relations: ['banco','proveedorTarjeta']
    });
    console.log(tipoTarjetas);
    return tipoTarjetas;
  }

}
