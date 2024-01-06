import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Person } from 'src/person/entities/person.entity';
import { UserMapper } from './mapper/user.mapper';
import { Role } from 'src/rol/entities/rol.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService,UserMapper],
  imports: [
    
    TypeOrmModule.forFeature([ User, Person, Role]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class UsersModule {}
