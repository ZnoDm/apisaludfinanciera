import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaGastoService } from './categoria-gasto.service';
import { CreateCategoriaGastoDto } from './dto/create-categoria-gasto.dto';
import { UpdateCategoriaGastoDto } from './dto/update-categoria-gasto.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('categoria-gasto')
export class CategoriaGastoController {
  constructor(private readonly categoriaGastoService: CategoriaGastoService) {}


  @Get('/listar')
  @Auth()
  getListar() {
    return this.categoriaGastoService.getListar();
  }
  
  @Get('/tipoGasto/:idTipoGasto/listar')
  @Auth()
  findAllByUserTipoGasto(
    @GetUser() user: User ,
    @Param('idTipoGasto') idTipoGasto: string
  ) {
    return this.categoriaGastoService.findAllByUserTipoGasto(user,+idTipoGasto);
  }

  @Get('')
  @Auth()
  findAll() {
    return this.categoriaGastoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaGastoService.findOneById(+id);
  }

  @Post()
  create(@Body() createCategoriaGastoDto: Partial<CategoriaGasto>) {
    return this.categoriaGastoService.create(createCategoriaGastoDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaGastoDto: Partial<CategoriaGasto>) {
    return this.categoriaGastoService.update(+id, updateCategoriaGastoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriaGastoService.delete(+id);
  }
 
}
