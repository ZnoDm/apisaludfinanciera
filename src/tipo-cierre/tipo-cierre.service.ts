import { Injectable } from '@nestjs/common';
import { CreateTipoCierreDto } from './dto/create-tipo-cierre.dto';
import { UpdateTipoCierreDto } from './dto/update-tipo-cierre.dto';
import { TipoCierre } from './entities/tipo-cierre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoCierreService {
  constructor(
    @InjectRepository(TipoCierre)
    private readonly bancoRepository: Repository<TipoCierre>,
  ) {}

  async create(createTipoCierreDto: CreateTipoCierreDto): Promise<TipoCierre> {
    const banco = this.bancoRepository.create(createTipoCierreDto);
    return await this.bancoRepository.save(banco);
  }

  async findAll(): Promise<TipoCierre[]> {
    return await this.bancoRepository.find();
  }

  async findOne(id: number): Promise<TipoCierre | undefined> {
    return await this.bancoRepository.findOne({ where : { id } });
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.bancoRepository.delete(id);
    return deleteResult.affected !== 0;
  }
}
