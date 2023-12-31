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

  async create(permisoData: Partial<Permiso>): Promise<Permiso> {
    const newPermiso: Permiso = await this.permisoRepository.create(permisoData);
    const savedPermiso: Permiso = await this.permisoRepository.save(newPermiso);
    return savedPermiso;
  }

  async update(id: number, permisoData: Partial<Permiso>): Promise<Permiso | undefined> {
    await this.permisoRepository.update(id, permisoData);
    const updatedPermiso: Permiso | undefined = await this.permisoRepository.findOne({where: {id}});
    return updatedPermiso;
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.permisoRepository.delete(id);
    return deleteResult.affected !== 0;
  }
}
