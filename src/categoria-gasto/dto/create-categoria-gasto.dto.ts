import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoriaGastoDto {

    @IsString()
    @MaxLength(100)
    nombres: string;
}
