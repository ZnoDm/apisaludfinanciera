import { Injectable } from '@nestjs/common';
import { CreateCategoriaGastoDto } from './dto/create-categoria-gasto.dto';
import { UpdateCategoriaGastoDto } from './dto/update-categoria-gasto.dto';

@Injectable()
export class CategoriaGastoService {
  create(createCategoriaGastoDto: CreateCategoriaGastoDto) {
    return 'This action adds a new categoriaGasto';
  }

  findAll() {
    return `This action returns all categoriaGasto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaGasto`;
  }

  update(id: number, updateCategoriaGastoDto: UpdateCategoriaGastoDto) {
    return `This action updates a #${id} categoriaGasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaGasto`;
  }
}
