import { Module } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoController } from './banco.controller';
import { Banco } from './entities/banco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { TipoCierre } from 'src/tipo-cierre/entities/tipo-cierre.entity';
import { TipoTarjeta } from 'src/tipo-tarjeta/entities/tipo-tarjeta.entity';

@Module({
  controllers: [BancoController],
  providers: [BancoService],
  imports: [
    
    TypeOrmModule.forFeature([ Banco,TipoCierre,TipoTarjeta]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class BancoModule {}
