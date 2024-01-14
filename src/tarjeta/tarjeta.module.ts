import { Module } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';
import { Tarjeta } from './entities/tarjeta.entity';
import { TarjetaPago } from './entities/tarjeta-pago.entity';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { TipoCierre } from '../tipo-cierre/entities/tipo-cierre.entity';

@Module({
  controllers: [TarjetaController],
  
  providers: [TarjetaService],
  imports: [
    
    TypeOrmModule.forFeature([ TipoTarjeta,Tarjeta,TarjetaPago,TipoCierre]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class TarjetaModule {}
