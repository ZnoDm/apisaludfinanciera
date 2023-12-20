import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePersonAvatarDto extends PartialType(CreatePersonDto) {

    @IsString()
    urlAvatar: string;
     
}

