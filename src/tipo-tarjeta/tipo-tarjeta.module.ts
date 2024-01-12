import { Module } from '@nestjs/common';
import { TipoTarjetaService } from './tipo-tarjeta.service';
import { TipoTarjetaController } from './tipo-tarjeta.controller';
import { TipoTarjeta } from './entities/tipo-tarjeta.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from 'src/banco/entities/banco.entity';
import { ProveedorTarjeta } from 'src/proveedor-tarjeta/entities/proveedor-tarjeta.entity';

@Module({
  controllers: [TipoTarjetaController],
  providers: [TipoTarjetaService],
  imports: [
    
    TypeOrmModule.forFeature([ TipoTarjeta,Banco,ProveedorTarjeta]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class TipoTarjetaModule {}
