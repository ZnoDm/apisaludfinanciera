import { Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisoService {
  constructor(
  @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>
  ){}

  async findAll() : Promise<Permiso[]> {
    const permisos: Permiso[] = await this.permisoRepository.find();
    return permisos;
  }
  async findOneById(id: number): Promise<Permiso | undefined> {
    const permiso: Permiso | undefined = await this.permisoRepository.findOne({where: {id}});
    return permiso;
  }

  async create(permisoData: Partial<Permiso>): Promise<any> {
    const newPermiso: Permiso = await this.permisoRepository.create(permisoData);
    const savedPermiso: Permiso = await this.permisoRepository.save(newPermiso);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedPermiso
    };
  }

  async update(id: number, permisoData: Partial<Permiso>): Promise<any> {
    await this.permisoRepository.update(id, permisoData);
    const updatedPermiso: Permiso | undefined = await this.permisoRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedPermiso
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.permisoRepository.delete(id);
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
}
