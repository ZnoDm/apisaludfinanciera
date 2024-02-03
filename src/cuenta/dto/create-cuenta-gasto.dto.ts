// celular-gasto.dto.ts

import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsDecimal } from 'class-validator';

export class CreateCuentaGastoDto {
    @IsNumber()
    cuentaId: number;

    @IsNumber()
    tipoGastoId: number;

    @IsString()
    categoriaGasto: string;

    @IsDate()
    fecha: Date;

    @IsDecimal()
    monto: number;
}

class CategoriaGastoDto {
    @IsNumber()
    id: number;

    @IsString()
    nombre: string;
}