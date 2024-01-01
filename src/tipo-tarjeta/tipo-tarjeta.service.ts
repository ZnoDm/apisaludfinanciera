import { Injectable } from '@nestjs/common';
import { CreateTipoTarjetaDto } from './dto/create-tipo-tarjeta.dto';
import { UpdateTipoTarjetaDto } from './dto/update-tipo-tarjeta.dto';

@Injectable()
export class TipoTarjetaService {
  create(createTipoTarjetaDto: CreateTipoTarjetaDto) {
    return 'This action adds a new tipoTarjeta';
  }

  findAll() {
    return `This action returns all tipoTarjeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoTarjeta`;
  }

  update(id: number, updateTipoTarjetaDto: UpdateTipoTarjetaDto) {
    return `This action updates a #${id} tipoTarjeta`;
  }

  delete(id: number) {
    return `This action deletes a #${id} tipoTarjeta`;
  }
}
