import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { Cuenta } from './entities/cuenta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [CuentaController],
  providers: [CuentaService],
  imports: [
    
    TypeOrmModule.forFeature([ Cuenta ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class CuentaModule {}
