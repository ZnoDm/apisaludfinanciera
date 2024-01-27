import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoGastoDto } from './create-tipo-gasto.dto';

export class UpdateTipoGastoDto extends PartialType(CreateTipoGastoDto) {}
