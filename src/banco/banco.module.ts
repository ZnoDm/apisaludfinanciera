import { Module } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoController } from './banco.controller';
import { Banco } from './entities/banco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [BancoController],
  providers: [BancoService],
  imports: [
    
    TypeOrmModule.forFeature([ Banco]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class BancoModule {}
