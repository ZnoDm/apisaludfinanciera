import { IsBoolean, IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    idPerson: number;

    @IsNumber()
    idRol: number;
    
    @IsBoolean()
    isActive: boolean;
}