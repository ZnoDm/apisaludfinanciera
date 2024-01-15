import { Injectable } from '@nestjs/common';
import { CreateTipoCierreDto } from './dto/create-tipo-cierre.dto';
import { UpdateTipoCierreDto } from './dto/update-tipo-cierre.dto';
import { TipoCierre } from './entities/tipo-cierre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoCierreService {
  constructor(
    @InjectRepository(TipoCierre)
    private readonly tipoCierreRepository: Repository<TipoCierre>,
  ) {}

  async findAll() : Promise<TipoCierre[]> {
    const tipoCierres: TipoCierre[] = await this.tipoCierreRepository.find();
    return tipoCierres;
  }
  async findOneById(id: number): Promise<TipoCierre | undefined> {
    const tipoCierre: TipoCierre | undefined = await this.tipoCierreRepository.findOne({where: {id}});
    return tipoCierre;
  }

  async create(tipoCierreData: Partial<TipoCierre>): Promise<any> {
    const newTipoCierre: TipoCierre = await this.tipoCierreRepository.create(tipoCierreData);
    const savedTipoCierre: TipoCierre = await this.tipoCierreRepository.save(newTipoCierre);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedTipoCierre
    };
  }

  async update(id: number, tipoCierreData: Partial<TipoCierre>): Promise<any> {
    await this.tipoCierreRepository.update(id, tipoCierreData);
    const updatedTipoCierre: TipoCierre | undefined = await this.tipoCierreRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedTipoCierre
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.tipoCierreRepository.delete(id);
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
    const tipoCierres: TipoCierre[] = await this.tipoCierreRepository.find(
      {select: { id: true, nombre:true }}
    );
    return tipoCierres;
  }

}
