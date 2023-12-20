import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { Person } from 'src/person/entities/person.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [CuentaController],
  providers: [CuentaService],
  imports:[
    TypeOrmModule.forFeature([ Cuenta,Person ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
  ]
})
export class CuentaModule {}
