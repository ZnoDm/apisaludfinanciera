import { Injectable } from '@nestjs/common';
import { CreateTipoGastoDto } from './dto/create-tipo-gasto.dto';
import { UpdateTipoGastoDto } from './dto/update-tipo-gasto.dto';

@Injectable()
export class TipoGastoService {
  create(createTipoGastoDto: CreateTipoGastoDto) {
    return 'This action adds a new tipoGasto';
  }

  findAll() {
    return `This action returns all tipoGasto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoGasto`;
  }

  update(id: number, updateTipoGastoDto: UpdateTipoGastoDto) {
    return `This action updates a #${id} tipoGasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoGasto`;
  }
}
