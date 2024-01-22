import { IsNumber, IsString } from "class-validator";

export class CreateCuentaDto {
    @IsString()
    nombre: string;
    @IsNumber()
    saldo: number;
    @IsNumber()
    saldoMensualPromedio: number;
    @IsNumber()
    metaId: number;
    @IsString()
    otraMeta: string;
}
