import { Module } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';

@Module({
  controllers: [TarjetaController],
  providers: [TarjetaService],
})
export class TarjetaModule {}
