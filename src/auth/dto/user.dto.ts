
import { IsBoolean, IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class UserDto {

    @IsNumber()
    id: number;
    @IsString()
    email: string;
    @IsString()
    urlAvatar: string;
    @IsBoolean()
    isActive: boolean;

}
