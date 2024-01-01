import { Module } from '@nestjs/common';
import { ProveedorTarjetaService } from './proveedor-tarjeta.service';
import { ProveedorTarjetaController } from './proveedor-tarjeta.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from 'src/banco/entities/banco.entity';
import { ProveedorTarjeta } from './entities/proveedor-tarjeta.entity';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';

@Module({
  controllers: [ProveedorTarjetaController],
  providers: [ProveedorTarjetaService],
  imports: [
    
    TypeOrmModule.forFeature([ ProveedorTarjeta,TipoTarjeta]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class ProveedorTarjetaModule {}
