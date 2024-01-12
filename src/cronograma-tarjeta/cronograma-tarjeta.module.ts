import { Module } from '@nestjs/common';
import { CronogramaTarjetaService } from './cronograma-tarjeta.service';
import { CronogramaTarjetaController } from './cronograma-tarjeta.controller';
import { CronogramaTarjeta } from './entities/cronograma-tarjeta.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CronogramaTarjetaController],
  providers: [CronogramaTarjetaService],
  
  imports: [
    
    TypeOrmModule.forFeature([ CronogramaTarjeta]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class CronogramaTarjetaModule {}
