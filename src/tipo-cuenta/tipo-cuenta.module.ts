import { Module } from '@nestjs/common';
import { TipoCuentaService } from './tipo-cuenta.service';
import { TipoCuentaController } from './tipo-cuenta.controller';

@Module({
  controllers: [TipoCuentaController],
  providers: [TipoCuentaService],
})
export class TipoCuentaModule {}
