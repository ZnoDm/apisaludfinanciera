import { Injectable } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';
import { TipoCierre } from 'src/tipo-cierre/entities/tipo-cierre.entity';

@Injectable()
export class TarjetaService {
  constructor(
    @InjectRepository(Tarjeta)
    private readonly tarjetaRepository: Repository<Tarjeta>,
    @InjectRepository(TipoTarjeta)
    private readonly tipoTarjetaRepository: Repository<TipoTarjeta>,
    @InjectRepository(TipoCierre)
    private readonly tipoCierreRepository: Repository<TipoCierre>,
  ) {}

  async findAll() : Promise<Tarjeta[]> {
    const tarjetas: Tarjeta[] = await this.tarjetaRepository.find();
    return tarjetas;
  }
  async findOneById(id: number): Promise<Tarjeta | undefined> {
    const tarjeta: Tarjeta | undefined = await this.tarjetaRepository.findOne({where: {id}});
    return tarjeta;
  }

  async create(createTarjetaDto: CreateTarjetaDto): Promise<any> {

    const { tipoTarjetaId, tipoCierreId, ...tarjetaData } = createTarjetaDto;
    console.log(createTarjetaDto);
    const tarjeta = new Tarjeta();
    
    const tipoTarjeta = await this.tipoTarjetaRepository.findOne({where : {id:tipoTarjetaId}});
    if (!tipoTarjeta) {
        throw new Error(`TipoTarjeta con ID ${tipoTarjetaId} no encontrado`);
    }

    tarjeta.tipoTarjeta = tipoTarjeta;

    const tipoCierre = await this.tipoCierreRepository.findOne({where : {id:tipoCierreId}});
    if (!tipoCierre) {
        throw new Error(`TipoCierre con ID ${tipoCierreId} no encontrado`);
    }

    tarjeta.tipoCierre = tipoCierre;

    Object.assign(tarjeta, tarjetaData);
    await this.tarjetaRepository.save(tarjeta);

    return {
      ok: true,
      message : `Creado con éxito`,
      tarjeta: tarjeta
    };
  }

  async update(id: number, tarjetaData: Partial<Tarjeta>): Promise<any> {
    await this.tarjetaRepository.update(id, tarjetaData);
    const updatedTarjeta: Tarjeta | undefined = await this.tarjetaRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedTarjeta
    };
  }

  async delete(id: number): Promise<any> {
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
}
