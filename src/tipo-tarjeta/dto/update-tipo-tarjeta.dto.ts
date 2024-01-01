import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoTarjetaDto } from './create-tipo-tarjeta.dto';

export class UpdateTipoTarjetaDto extends PartialType(CreateTipoTarjetaDto) {}
