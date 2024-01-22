import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';
import { TipoCierre } from 'src/tipo-cierre/entities/tipo-cierre.entity';
import { Person } from 'src/person/entities/person.entity';
import { User } from 'src/users/entities/user.entity';
import { TarjetaPago } from './entities/tarjeta-pago.entity';
import { BodyRecordatorioDto } from './dto/body-recordatorio.dto';

@Injectable()
export class TarjetaService {
  constructor(
    @InjectRepository(Tarjeta)
    private readonly tarjetaRepository: Repository<Tarjeta>,
    @InjectRepository(TarjetaPago)
    private readonly tarjetaPagoRepository: Repository<TarjetaPago>,
    @InjectRepository(TipoTarjeta)
    private readonly tipoTarjetaRepository: Repository<TipoTarjeta>,
    @InjectRepository(TipoCierre)
    private readonly tipoCierreRepository: Repository<TipoCierre>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() : Promise<Tarjeta[]> {
    const tarjetas: Tarjeta[] = await this.tarjetaRepository.find();
    return tarjetas;
  }
  async findOneById(id: number): Promise<Tarjeta | undefined> {
    const tarjeta: Tarjeta | undefined = await this.tarjetaRepository.findOne({where: {id}});
    return tarjeta;
  }


  async create(user: User,createTarjetaDto: CreateTarjetaDto): Promise<any> {

    const { tipoTarjetaId, tipoCierreId, ...tarjetaData } = createTarjetaDto;
    console.log(createTarjetaDto);
    const tarjeta = new Tarjeta();
    
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    tarjeta.person = usuario.person;

    const tipoTarjeta = await this.tipoTarjetaRepository.findOne({where : {id:tipoTarjetaId}});
    if (!tipoTarjeta) {
        throw new NotFoundException(`TipoTarjeta con ID ${tipoTarjetaId} no encontrado`);
    }
    tarjeta.tipoTarjeta = tipoTarjeta;

    const tipoCierre = await this.tipoCierreRepository.findOne({where : {id:tipoCierreId}});
    if (!tipoCierre) {
        throw new NotFoundException(`TipoCierre con ID ${tipoCierreId} no encontrado`);
    }
    tarjeta.tipoCierre = tipoCierre;

    const fechaActual = new Date();

    tarjeta.anioInicio = fechaActual.getFullYear();
    tarjeta.mesInicio = fechaActual.getMonth() + 1;

    Object.assign(tarjeta, tarjetaData);
    await this.tarjetaRepository.save(tarjeta);

    return {
      ok: true,
      message : `Creado con éxito`,
      tarjeta: tarjeta
    };
  }

  async update(idTarjeta: number, user: User,updateTarjetaDto: CreateTarjetaDto): Promise<any> {

    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    const tarjeta = await this.tarjetaRepository.findOne({ where :{id: idTarjeta}, relations : ['person']});
    if(tarjeta.person.id != usuario.person.id){
      throw new NotFoundException(`La tarjeta with ID ${idTarjeta} no le pertenece a este Usuario with ID ${user.id}`);
    }

    const { tipoTarjetaId, tipoCierreId, ...tarjetaData } = updateTarjetaDto;
    const tipoTarjeta = await this.tipoTarjetaRepository.findOne({where : {id:tipoTarjetaId}});
    if (!tipoTarjeta) {
        throw new NotFoundException(`TipoTarjeta con ID ${tipoTarjetaId} no encontrado`);
    }
    const tipoCierre = await this.tipoCierreRepository.findOne({where : {id:tipoCierreId}});
    if (!tipoCierre) {
      throw new NotFoundException(`TipoCierre con ID ${tipoCierreId} no encontrado`);
    }
    tarjeta.tipoTarjeta = tipoTarjeta;
    tarjeta.tipoCierre = tipoCierre;
    tarjeta.nombre = tarjetaData.nombre;
    tarjeta.hasNotifyCelular = tarjetaData.hasNotifyCelular;
    tarjeta.hasNotifyEmail = tarjetaData.hasNotifyEmail;
    tarjeta.isActive = tarjetaData.isActive;

    await this.tarjetaRepository.update(idTarjeta, tarjeta);
    return {
      ok: true,
      message : `Actualizado con éxito`,
      tarjeta: tarjeta
    };
  }

  async delete(id: number): Promise<any> {
    
    const tarjeta: Tarjeta = await this.tarjetaRepository.findOne({where: {id},relations:['tarjetaPagos']});
    if (!tarjeta) {
      throw new NotFoundException(`Tarjeta con ID ${id} no encontrado`);
    }

    await this.tarjetaPagoRepository.remove(tarjeta.tarjetaPagos);

    const deleteResult = await this.tarjetaRepository.delete(id);
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

  async getTarjetasByPerson (user: User){
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    return await this.tarjetaRepository.query("spGetTarjetasCreditoByPerson @prmintIdPerson="+usuario.person.id +"");
  }
  async getAniosByTarjeta (idTarjeta:number ,user: User){

    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    const tarjeta = await this.tarjetaRepository.findOne({ where :{id: idTarjeta}, relations : ['person']});
    if(tarjeta.person.id != usuario.person.id){
      throw new NotFoundException(`La tarjeta with ID ${idTarjeta} no le pertenece a este Usuario with ID ${user.id}`);
    }
    const ultimoPago : TarjetaPago = await this.tarjetaPagoRepository
    .createQueryBuilder('CT')
    .orderBy('CT.anio * 100 + CT.mes', 'ASC')
    .getOne();
    let anioFin: number;

    console.log(ultimoPago);
    if(ultimoPago !=null && ultimoPago?.mes == 12){
      anioFin = ultimoPago.anio + 1
    }else if(ultimoPago !=null && ultimoPago?.anio){
      anioFin = ultimoPago.anio 
    }else{
      anioFin = tarjeta.anioInicio
    }

    return this.crearArrayAnios(tarjeta.anioInicio,anioFin,anioFin);

  }

  crearArrayAnios(anioInicio: number,anioFin:number, anioActual: number) {
    const miArray = [];
    for (var i = anioInicio; i <= anioFin; i++) {
        miArray.push({ value: i, nombre: i , current: (i == anioActual) ? true : false });
    }
    return miArray;
  }


  async getPeriodosByTarjeta (idTarjeta:number ,user: User,anio:number){

    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    const tarjeta = await this.tarjetaRepository.findOne({ where :{id: idTarjeta}, relations : ['person']});
    if(tarjeta.person.id != usuario.person.id){
      throw new NotFoundException(`La tarjeta with ID ${idTarjeta} no le pertenece a este Usuario with ID ${user.id}`);
    }
    console.log(tarjeta.person.id,usuario.person.id)
    return await this.tarjetaRepository.query("spGetPeriodosByTarjetaCredito  @prmintIdTarjetaCredito ="+idTarjeta +",@prmintAnio ="+anio );
  }
 

  async getCronogramaByTarjeta (idTarjeta:number ,user: User,anio:number,mes:number){
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    const tarjeta = await this.tarjetaRepository.findOne({ where :{id: idTarjeta}, relations : ['person']});
    if(tarjeta.person.id != usuario.person.id){
      throw new NotFoundException(`La tarjeta with ID ${idTarjeta} no le pertenece a este Usuario with ID ${user.id}`);
    }
    return await this.tarjetaRepository.query("spGetCronogramaByTarjetaCredito @prmintIdTarjetaCredito ="+idTarjeta +", @prmintAnio ="+ anio+", @prmintMes ="+ mes);
  }

  async enabledDisabledTarjeta(id: number): Promise<any> {
    const tarjeta = await this.tarjetaRepository.findOne({ where :{id: id}});

    if (!tarjeta) {
      throw new NotFoundException(`Tarjeta with ID ${id} not found`);
    }

    tarjeta.isActive = !tarjeta.isActive;
    await this.tarjetaRepository.save(tarjeta);
    return {
      ok : true,
      tarjeta
    };
  }
  
}
