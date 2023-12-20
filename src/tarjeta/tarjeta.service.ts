import { Injectable } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Injectable()
export class TarjetaService {
  create(createTarjetaDto: CreateTarjetaDto) {
    return 'This action adds a new tarjeta';
  }

  findAll() {
    return `This action returns all tarjeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tarjeta`;
  }

  update(id: number, updateTarjetaDto: UpdateTarjetaDto) {
    return `This action updates a #${id} tarjeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarjeta`;
  }
}
