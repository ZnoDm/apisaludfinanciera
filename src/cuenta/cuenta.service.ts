import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Meta } from 'src/meta/entities/meta.entity';
import { TipoGasto } from 'src/tipo-gasto/entities/tipo-gasto.entity';
import { CreateCuentaGastoDto } from './dto/create-cuenta-gasto.dto';
import { CategoriaGasto } from 'src/categoria-gasto/entities/categoria-gasto.entity';
import { CuentaGasto } from './entities/cuenta-gasto.entity';
@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepository: Repository<Cuenta>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
    @InjectRepository(TipoGasto)
    private readonly tipoGastoRepository: Repository<TipoGasto>,
    @InjectRepository(CategoriaGasto)
    private readonly categoriaGastoRepository: Repository<CategoriaGasto>,
    @InjectRepository(CuentaGasto)
    private readonly cuentaGastoRepository: Repository<CuentaGasto>,
  ) {}

  async findAll() : Promise<Cuenta[]> {
    const cuentas: Cuenta[] = await this.cuentaRepository.find();
    return cuentas;
  }
  async findOneById(id: number): Promise<Cuenta | undefined> {
    const cuenta: Cuenta | undefined = await this.cuentaRepository.findOne({where: {id}});
    return cuenta;
  }
  
  async findAllByUser(user: User): Promise<any> {
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
 
    
    return await this.cuentaRepository.query("spGetCuentasByPerson  @prmintIdPerson ="+usuario.person.id );
  }
  async getResumenGastoByPerson(user: User): Promise<any> {
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
 
    
    return await this.cuentaRepository.query("spGetResumenGastoByPerson  @prmintIdPerson ="+usuario.person.id );
  }

  
  async getHistoriaCuentaByPerson(idCuenta:number,user: User): Promise<any> {
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }

    const historias : any[] =  await this.cuentaRepository.query("spGetHistoriaCuentaByPerson  @prmintIdPerson ="+usuario.person.id +",@prmintIdCuenta = " + idCuenta);
    const historiaAgrupadaPorMes: { [mes: string]: any[] } = {};

    historias.forEach(historia => {
      const { NombreMes } = historia;

      if (!historiaAgrupadaPorMes[NombreMes]) {
          historiaAgrupadaPorMes[NombreMes] = [];
      }

      historiaAgrupadaPorMes[NombreMes].push(historia);
    });

    const resultado: any[] = Object.keys(historiaAgrupadaPorMes).map(mes => ({
        mes,
        historias: historiaAgrupadaPorMes[mes]
    }));

    return resultado;

  }

  async donaHistorial(user: User): Promise<any> {
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    return await this.cuentaRepository.query("spGetGraficoDonaResumen  @prmintIdPerson ="+usuario.person.id );
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
        throw new NotFoundException(`Meta con ID ${metaId} no encontrado`);
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

  async addGasto( user:User, createCuentaGastoDto:Partial<CreateCuentaGastoDto>){
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }

    const {cuentaId,tipoGastoId, categoriaGasto: categoriaGastoNombre ,fecha,monto} = createCuentaGastoDto;

    const tipoGasto = await this.tipoGastoRepository.findOne({where : {id:tipoGastoId}});
    if (!tipoGasto) {
        throw new NotFoundException(`Tipo Gasto con ID ${tipoGastoId} no encontrado`);
    }
    const cuenta = await this.cuentaRepository.findOne({where : {id:cuentaId}});
    if (!cuenta) {
      throw new NotFoundException(`Cuenta con ID ${cuentaId} no encontrado`);
    }

  
    const categoriaGastoFormat = categoriaGastoNombre.replace(/\s/g, '').toLowerCase();

    return {
      ok: true,
      message : `Gasto registrado con éxito`,
      cuentaGasto: await this.cuentaRepository.query("spSaveCuentaGasto @prmintIdPerson ="+usuario.person.id +",@prmintIdTipoGasto ="+tipoGasto.id +",@prmintIdCuenta ="+cuenta.id +",@prmstrCategoriaGasto ="+ categoriaGastoFormat+",@prmstrFecha ='"+fecha +"',@prmintMonto ="+monto)
    };
  }
}
