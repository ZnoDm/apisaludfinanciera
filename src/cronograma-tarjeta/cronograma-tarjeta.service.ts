import { Injectable } from '@nestjs/common';
import { CreateCronogramaTarjetaDto } from './dto/create-cronograma-tarjeta.dto';
import { UpdateCronogramaTarjetaDto } from './dto/update-cronograma-tarjeta.dto';

@Injectable()
export class CronogramaTarjetaService {
  create(createCronogramaTarjetaDto: CreateCronogramaTarjetaDto) {
    return 'This action adds a new cronogramaTarjeta';
  }

  findAll() {
    return `This action returns all cronogramaTarjeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cronogramaTarjeta`;
  }

  update(id: number, updateCronogramaTarjetaDto: UpdateCronogramaTarjetaDto) {
    return `This action updates a #${id} cronogramaTarjeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} cronogramaTarjeta`;
  }
}
