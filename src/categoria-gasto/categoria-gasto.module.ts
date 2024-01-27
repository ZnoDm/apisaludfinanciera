import { Module } from '@nestjs/common';
import { CategoriaGastoService } from './categoria-gasto.service';
import { CategoriaGastoController } from './categoria-gasto.controller';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [CategoriaGastoController],
  providers: [CategoriaGastoService],
  imports: [
    
    TypeOrmModule.forFeature([ CategoriaGasto,User ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class CategoriaGastoModule {}
