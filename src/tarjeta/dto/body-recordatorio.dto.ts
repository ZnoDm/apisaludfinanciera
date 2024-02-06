import { IsBoolean, IsNumber, IsString } from "class-validator";

export class BodyRecordatorioDto {

    @IsNumber()
    anio?: number;
    @IsNumber()
    mes?: number;
}
