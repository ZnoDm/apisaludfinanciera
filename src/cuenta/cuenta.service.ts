import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Meta } from 'src/meta/entities/meta.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepository: Repository<Cuenta>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
  ) {}

  async findAll() : Promise<Cuenta[]> {
    const cuentas: Cuenta[] = await this.cuentaRepository.find();
    return cuentas;
  }
  async findOneById(id: number): Promise<Cuenta | undefined> {
    const cuenta: Cuenta | undefined = await this.cuentaRepository.findOne({where: {id}});
    return cuenta;
  }

  async create(user: User,CreateCuentaDto: Partial<CreateCuentaDto>): Promise<any> {

    const { metaId, ...cuentaData } = CreateCuentaDto;
    console.log(cuentaData);

    const cuenta = new Cuenta();
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    cuenta.person = usuario.person;

    const meta = await this.metaRepository.findOne({where : {id:metaId}});
    if (!meta) {
        throw new NotFoundException(`TipoTarjeta con ID ${metaId} no encontrado`);
    }
    cuenta.metas = [meta];
    Object.assign(cuenta, cuentaData);
    
    await this.cuentaRepository.save(cuenta);

    return {
      ok: true,
      message : `Creado con éxito`,
      cuenta: cuenta
    };
  }

  async update(id: number, cuentaData: Partial<Cuenta>): Promise<any> {
    await this.cuentaRepository.update(id, cuentaData);
    const updatedCuenta: Cuenta | undefined = await this.cuentaRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      cuenta: updatedCuenta
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.cuentaRepository.delete(id);
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
    const cuentas: Cuenta[] = await this.cuentaRepository.find(
      {select: { id: true, nombre:true}}
    );
    return cuentas;
  }

}
