import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  imports: [
    
    TypeOrmModule.forFeature([ User, Person]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class PersonModule {}
