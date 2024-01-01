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

  async create(createBancoDto: CreateBancoDto): Promise<Banco> {
    const banco = this.bancoRepository.create(createBancoDto);
    return await this.bancoRepository.save(banco);
  }

  async findAll(): Promise<Banco[]> {
    return await this.bancoRepository.find();
  }

  async findOne(id: number): Promise<Banco | undefined> {
    return await this.bancoRepository.findOne({ where : { id } });
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.bancoRepository.delete(id);
    return deleteResult.affected !== 0;
  }
}
