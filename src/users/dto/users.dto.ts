
import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class UserDto {

    @Expose()
    id: number;
    @Expose()
    email: string;
    @Expose()
    isActive: boolean;
    @Expose()
    nombres: string;
    @Expose()
    apellidos: string;
    @Expose()
    tipoDocumentoIdentidad: string;
    @Expose()
    documentoIdentidad: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
      }
}
