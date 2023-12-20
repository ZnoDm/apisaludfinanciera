import { Module } from '@nestjs/common';
import { TipoGastoService } from './tipo-gasto.service';
import { TipoGastoController } from './tipo-gasto.controller';

@Module({
  controllers: [TipoGastoController],
  providers: [TipoGastoService],
})
export class TipoGastoModule {}
