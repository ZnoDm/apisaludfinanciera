import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Role } from './entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from 'src/permiso/entities/permiso.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ){}


  
  async getListar() {
    const roles: Role[] = await this.roleRepository.find();
    return roles;
  }



  async findAll() : Promise<Role[]> {
    const roles: Role[] = await this.roleRepository.find();
    return roles;
  }
  async findOneById(id: number): Promise<Role | undefined> {
    const role: Role | undefined = await this.roleRepository.findOne({where: {id}});
    return role;
  }

  async create(roleData: Partial<Role>): Promise<any> {
    const newRole: Role = await this.roleRepository.create(roleData);
    const savedRole: Role = await this.roleRepository.save(newRole);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedRole
    };
  }

  async update(id: number, roleData: Partial<Role>): Promise<any> {
    await this.roleRepository.update(id, roleData);
    const updatedRole: Role | undefined = await this.roleRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedRole
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.roleRepository.delete(id);
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




  
  async getAllPermisosForRole(roleId: number): Promise<any> {
    const role = await this.roleRepository.findOne({ where: {id: roleId}, relations: ['permisos'] });

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    const allPermisos = await this.permisoRepository.find();

    const permisos = allPermisos.map((permiso) => {
      const isActive = role.permisos.some((p) => p.id === permiso.id);
      return {
        ...permiso,
        active: isActive,
      };
    });
    return permisos;
  }

  async togglePermisoForRole(roleId: number, permisoId: number, isActive: boolean): Promise<any> {
    const role = await this.roleRepository.findOne({ where: { id : roleId },  relations: ['permisos'] });
    const permiso = await this.permisoRepository.findOne( { where : { id: permisoId} });

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    if (!permiso) {
      throw new NotFoundException(`Permiso with ID ${permisoId} not found`);
    }

    const existingPermisoIndex = role.permisos.findIndex((p) => p.id == permisoId);
    if (isActive && existingPermisoIndex === -1) {
      role.permisos.push(permiso);
    } else if (!isActive && existingPermisoIndex !== -1) {
      console.log(isActive )
      console.log( existingPermisoIndex)
      role.permisos.splice(existingPermisoIndex, 1);
    }

    await this.roleRepository.save(role);
    return {
      ok: true,
      role
    }
  }

}
