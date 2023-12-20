import { IsDate, IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateCuentaDto {
    @IsNumber()
    idTipoCuenta: number;

    @IsNumber()
    idPersona: number;

    @IsString()
    nombre: string

    @IsString()
    descripcion: string;

    @IsDecimal()
    presupuesto: number;
}
