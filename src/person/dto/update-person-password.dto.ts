import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePersonPasswordDto extends PartialType(CreatePersonDto) {

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    oldPassword: string;
  

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The new password must have a Uppercase, lowercase letter and a number'
    })
    newPassword: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The new confirm password must have a Uppercase, lowercase letter and a number'
    })
    confirmPassword: string;
    
}

