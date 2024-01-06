import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    idPerson: number;

    @IsBoolean()
    isActive: boolean;
}
