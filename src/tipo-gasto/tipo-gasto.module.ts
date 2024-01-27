import { Module } from '@nestjs/common';
import { TipoGastoService } from './tipo-gasto.service';
import { TipoGastoController } from './tipo-gasto.controller';
import { TipoGasto } from './entities/tipo-gasto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [TipoGastoController],
  providers: [TipoGastoService],
  imports: [
    
    TypeOrmModule.forFeature([ TipoGasto]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class TipoGastoModule {}
