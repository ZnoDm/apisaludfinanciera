import { Module } from '@nestjs/common';
import { CategoriaGastoService } from './categoria-gasto.service';
import { CategoriaGastoController } from './categoria-gasto.controller';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { TipoGasto } from 'src/tipo-gasto/entities/tipo-gasto.entity';

@Module({
  controllers: [CategoriaGastoController],
  providers: [CategoriaGastoService],
  imports: [
    
    TypeOrmModule.forFeature([ CategoriaGasto,User,TipoGasto ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class CategoriaGastoModule {}
