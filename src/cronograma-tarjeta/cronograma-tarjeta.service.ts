import { Injectable } from '@nestjs/common';
import { CreateCronogramaTarjetaDto } from './dto/create-cronograma-tarjeta.dto';
import { UpdateCronogramaTarjetaDto } from './dto/update-cronograma-tarjeta.dto';
import { CronogramaTarjeta } from './entities/cronograma-tarjeta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CronogramaTarjetaService {

  constructor(
    @InjectRepository(CronogramaTarjeta)
    private readonly cronogramaTarjetaRepository: Repository<CronogramaTarjeta>,
  ) {}
  

  async findAll() : Promise<CronogramaTarjeta[]> {
    const cronogramaTarjetas: CronogramaTarjeta[] = await this.cronogramaTarjetaRepository.find({relations:['banco','tipoCierre']});
    return cronogramaTarjetas;
  }
  async findOneById(id: number): Promise<CronogramaTarjeta | undefined> {
    const cronogramaTarjeta: CronogramaTarjeta | undefined = await this.cronogramaTarjetaRepository.findOne({where: {id} ,relations:['banco']});
    return cronogramaTarjeta;
  }

  async create(cronogramaTarjetaData: Partial<CronogramaTarjeta>): Promise<any> {
    const newCronogramaTarjeta: CronogramaTarjeta = await this.cronogramaTarjetaRepository.create(cronogramaTarjetaData);
    const savedCronogramaTarjeta: CronogramaTarjeta = await this.cronogramaTarjetaRepository.save(newCronogramaTarjeta);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedCronogramaTarjeta
    };
  }

  async update(id: number, cronogramaTarjetaData: Partial<CronogramaTarjeta>): Promise<any> {
    await this.cronogramaTarjetaRepository.update(id, cronogramaTarjetaData);
    const updatedCronogramaTarjeta: CronogramaTarjeta | undefined = await this.cronogramaTarjetaRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedCronogramaTarjeta
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.cronogramaTarjetaRepository.delete(id);
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
