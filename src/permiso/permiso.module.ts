import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { Permiso } from './entities/permiso.entity';
import { Role } from 'src/rol/entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [PermisoController],
  providers: [PermisoService],
  imports: [
    
    TypeOrmModule.forFeature([ Role,Permiso]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class PermisoModule {}
