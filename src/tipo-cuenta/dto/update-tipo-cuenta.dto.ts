import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCuentaDto } from './create-tipo-cuenta.dto';

export class UpdateTipoCuentaDto extends PartialType(CreateTipoCuentaDto) {}
