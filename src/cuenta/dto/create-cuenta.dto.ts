import { IsNumber, IsString } from "class-validator";

export class CreateCuentaDto {
    @IsString()
    nombre: string;
    @IsNumber()
    saldoMensualPromedio: number;
    @IsNumber()
    metaId: number;
}
