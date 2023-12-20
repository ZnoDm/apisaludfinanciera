import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {

    @IsOptional()
    @IsString()
    @MaxLength(100)
    nombres: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(100)
    apellidos: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(20)
    telefono: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(4)
    tipoDocumentoIdentidad: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(20)
    documentoIdentidad: string;
    
}

