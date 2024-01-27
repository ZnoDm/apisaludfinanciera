import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { Cuenta } from './entities/cuenta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { Meta } from 'src/meta/entities/meta.entity';
import { CuentaGasto } from './entities/cuenta-gasto.entity';
import { CuentaMetas } from './entities/cuenta-metas.entity';
import { CategoriaGasto } from 'src/categoria-gasto/entities/categoria-gasto.entity';
import { TipoGasto } from 'src/tipo-gasto/entities/tipo-gasto.entity';

@Module({
  controllers: [CuentaController],
  providers: [CuentaService],
  imports: [
    
    TypeOrmModule.forFeature([ Cuenta,User,Meta,CategoriaGasto,TipoGasto,CuentaGasto ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class CuentaModule {}
