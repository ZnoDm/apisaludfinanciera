import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorTarjetaDto } from './create-proveedor-tarjeta.dto';

export class UpdateProveedorTarjetaDto extends PartialType(CreateProveedorTarjetaDto) {}
