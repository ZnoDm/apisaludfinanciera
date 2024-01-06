import { Injectable } from '@nestjs/common';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BancoService {
  constructor(
    @InjectRepository(Banco)
    private readonly bancoRepository: Repository<Banco>,
  ) {}

  async findAll() : Promise<Banco[]> {
    const bancos: Banco[] = await this.bancoRepository.find();
    return bancos;
  }
  async findOneById(id: number): Promise<Banco | undefined> {
    const banco: Banco | undefined = await this.bancoRepository.findOne({where: {id}});
    return banco;
  }

  async create(bancoData: Partial<Banco>): Promise<any> {
    const newBanco: Banco = await this.bancoRepository.create(bancoData);
    const savedBanco: Banco = await this.bancoRepository.save(newBanco);
    return {
      ok: true,
      message : `Creado con éxito`,
      rol: savedBanco
    };
  }

  async update(id: number, bancoData: Partial<Banco>): Promise<any> {
    await this.bancoRepository.update(id, bancoData);
    const updatedBanco: Banco | undefined = await this.bancoRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      rol: updatedBanco
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.bancoRepository.delete(id);
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
