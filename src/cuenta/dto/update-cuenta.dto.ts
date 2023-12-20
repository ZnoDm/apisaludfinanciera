import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaDto } from './create-cuenta.dto';
import { IsDecimal, IsNumber } from 'class-validator';

export class UpdateCuentaDto extends PartialType(CreateCuentaDto) {
    @IsNumber()
    id: number;
  
    @IsNumber()
    tipoGastoId: number;
  
    @IsNumber()
    categoriaGastoId: number;
  
    @IsDecimal()
    monto: number;
}
