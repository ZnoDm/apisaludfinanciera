import { Module } from '@nestjs/common';
import { TipoCierreService } from './tipo-cierre.service';
import { TipoCierreController } from './tipo-cierre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Banco } from 'src/banco/entities/banco.entity';
import { ProveedorTarjeta } from 'src/proveedor-tarjeta/entities/proveedor-tarjeta.entity';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';
import { TipoCierre } from './entities/tipo-cierre.entity';

@Module({
  controllers: [TipoCierreController],
  providers: [TipoCierreService],
  
  imports: [
    
    TypeOrmModule.forFeature([ TipoCierre,Banco]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class TipoCierreModule {}
