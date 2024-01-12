import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/rol.entity';
import { PassportModule } from '@nestjs/passport';
import { Permiso } from 'src/permiso/entities/permiso.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [RolController],
  providers: [RolService],
  imports: [
    
    TypeOrmModule.forFeature([ Role, Permiso, User]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class RolModule {}
