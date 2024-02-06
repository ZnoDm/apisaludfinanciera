import { Injectable } from '@nestjs/common';
import { CreateTipoGastoDto } from './dto/create-tipo-gasto.dto';
import { UpdateTipoGastoDto } from './dto/update-tipo-gasto.dto';
import { TipoGasto } from './entities/tipo-gasto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoGastoService {
  constructor(
    @InjectRepository(TipoGasto)
    private readonly tipoGastoRepository: Repository<TipoGasto>,
  ) {}

  async findAll() : Promise<TipoGasto[]> {
    const tipoGastos: TipoGasto[] = await this.tipoGastoRepository.find();
    return tipoGastos;
  }
  async findOneById(id: number): Promise<TipoGasto | undefined> {
    const tipoGasto: TipoGasto | undefined = await this.tipoGastoRepository.findOne({where: {id}});
    return tipoGasto;
  }

  async create(tipoGastoData: Partial<TipoGasto>): Promise<any> {
    const newTipoGasto: TipoGasto = await this.tipoGastoRepository.create(tipoGastoData);
    const savedTipoGasto: TipoGasto = await this.tipoGastoRepository.save(newTipoGasto);
    return {
      ok: true,
      message : `Creado con éxito`,
      tipoGasto: savedTipoGasto
    };
  }

  async update(id: number, tipoGastoData: Partial<TipoGasto>): Promise<any> {
    await this.tipoGastoRepository.update(id, tipoGastoData);
    const updatedTipoGasto: TipoGasto | undefined = await this.tipoGastoRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      tipoGasto: updatedTipoGasto
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.tipoGastoRepository.delete(id);
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
    const tipoGastos: TipoGasto[] = await this.tipoGastoRepository.find(
      {select: { id: true, nombre:true}}
    );
    return tipoGastos;
  }

}
