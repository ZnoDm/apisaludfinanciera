import { Module } from '@nestjs/common';
import { CategoriaGastoService } from './categoria-gasto.service';
import { CategoriaGastoController } from './categoria-gasto.controller';

@Module({
  controllers: [CategoriaGastoController],
  providers: [CategoriaGastoService],
})
export class CategoriaGastoModule {}
