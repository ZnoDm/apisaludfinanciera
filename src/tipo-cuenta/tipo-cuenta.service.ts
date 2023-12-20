import { Injectable } from '@nestjs/common';
import { CreateTipoCuentaDto } from './dto/create-tipo-cuenta.dto';
import { UpdateTipoCuentaDto } from './dto/update-tipo-cuenta.dto';

@Injectable()
export class TipoCuentaService {
  create(createTipoCuentaDto: CreateTipoCuentaDto) {
    return 'This action adds a new tipoCuenta';
  }

  findAll() {
    return `This action returns all tipoCuenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCuenta`;
  }

  update(id: number, updateTipoCuentaDto: UpdateTipoCuentaDto) {
    return `This action updates a #${id} tipoCuenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCuenta`;
  }
}
