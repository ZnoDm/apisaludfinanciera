import { PartialType } from '@nestjs/mapped-types';
import { CreateCronogramaTarjetaDto } from './create-cronograma-tarjeta.dto';

export class UpdateCronogramaTarjetaDto extends PartialType(CreateCronogramaTarjetaDto) {}
