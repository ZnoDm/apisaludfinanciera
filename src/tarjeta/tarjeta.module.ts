import { Module } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';
import { Tarjeta } from './entities/tarjeta.entity';
import { TarjetaPago } from './entities/tarjeta-pago.entity';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { TipoCierre } from '../tipo-cierre/entities/tipo-cierre.entity';
import { User } from 'src/users/entities/user.entity';
import { Person } from 'src/person/entities/person.entity';

@Module({
  controllers: [TarjetaController],
  
  providers: [TarjetaService],
  imports: [
    
    TypeOrmModule.forFeature([ TipoTarjeta,Tarjeta,TarjetaPago,TipoCierre,Person,User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class TarjetaModule {}
