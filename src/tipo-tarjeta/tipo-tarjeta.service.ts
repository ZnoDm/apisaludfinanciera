import { Injectable } from '@nestjs/common';
import { CreateTipoTarjetaDto } from './dto/create-tipo-tarjeta.dto';
import { UpdateTipoTarjetaDto } from './dto/update-tipo-tarjeta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoTarjeta } from './entities/tipo-tarjeta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoTarjetaService {

  constructor(
    @InjectRepository(TipoTarjeta)
    private readonly tipoTarjetaRepository: Repository<TipoTarjeta>,
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

  async getListar() {
    const tipoTarjetas: TipoTarjeta[] = await this.tipoTarjetaRepository.find(
      {select: { id: true, nombre: true }}
    );
    return tipoTarjetas;
  }

}
