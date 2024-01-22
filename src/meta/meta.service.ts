import { Injectable } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meta } from './entities/meta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
  ) {}

  async findAll() : Promise<Meta[]> {
    const metas: Meta[] = await this.metaRepository.find();
    return metas;
  }
  async findOneById(id: number): Promise<Meta | undefined> {
    const meta: Meta | undefined = await this.metaRepository.findOne({where: {id}});
    return meta;
  }

  async create(metaData: Partial<Meta>): Promise<any> {
    const newMeta: Meta = await this.metaRepository.create(metaData);
    const savedMeta: Meta = await this.metaRepository.save(newMeta);
    return {
      ok: true,
      message : `Creado con éxito`,
      meta: savedMeta
    };
  }

  async update(id: number, metaData: Partial<Meta>): Promise<any> {
    await this.metaRepository.update(id, metaData);
    const updatedMeta: Meta | undefined = await this.metaRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      meta: updatedMeta
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.metaRepository.delete(id);
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
    const metas: Meta[] = await this.metaRepository.find(
      {select: { id: true, nombre:true}}
    );
    return metas;
  }

}
