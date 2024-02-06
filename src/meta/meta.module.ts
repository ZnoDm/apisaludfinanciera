import { Module } from '@nestjs/common';
import { MetaService } from './meta.service';
import { MetaController } from './meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Meta } from './entities/meta.entity';

@Module({
  controllers: [MetaController],
  providers: [MetaService],
  imports: [
    
    TypeOrmModule.forFeature([ Meta ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    
  ]
})
export class MetaModule {}
