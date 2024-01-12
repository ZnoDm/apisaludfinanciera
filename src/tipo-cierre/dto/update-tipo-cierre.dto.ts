import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCierreDto } from './create-tipo-cierre.dto';

export class UpdateTipoCierreDto extends PartialType(CreateTipoCierreDto) {}
