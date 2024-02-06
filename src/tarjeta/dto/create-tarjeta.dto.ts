import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateTarjetaDto {
    @IsString()
    nombre: string;
    @IsNumber()
    tipoTarjetaId: number;
    @IsNumber()
    tipoCierreId: number;
    @IsBoolean()
    isActive: boolean;
    @IsBoolean()
    hasNotifyCelular: boolean;
    @IsBoolean()
    hasNotifyEmail: boolean;
}
