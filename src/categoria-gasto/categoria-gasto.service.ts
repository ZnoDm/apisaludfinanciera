import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaGastoDto } from './dto/create-categoria-gasto.dto';
import { UpdateCategoriaGastoDto } from './dto/update-categoria-gasto.dto';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { TipoGasto } from 'src/tipo-gasto/entities/tipo-gasto.entity';

@Injectable()
export class CategoriaGastoService {
  constructor(
    @InjectRepository(CategoriaGasto)
    private readonly categoriaGastoRepository: Repository<CategoriaGasto>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TipoGasto)
    private readonly tipoGastoRepository: Repository<TipoGasto>,
  ) {}

  async findAll() : Promise<CategoriaGasto[]> {
    const categoriaGastos: CategoriaGasto[] = await this.categoriaGastoRepository.find();
    return categoriaGastos;
  }
  async findOneById(id: number): Promise<CategoriaGasto | undefined> {
    const categoriaGasto: CategoriaGasto | undefined = await this.categoriaGastoRepository.findOne({where: {id}});
    return categoriaGasto;
  }
  async findAllByUserTipoGasto(user: User,idTipoGasto:number): Promise<any> {
    const usuario = await this.userRepository.findOne({where : {id:user.id , isActive : true} , relations : ['person']});
        if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    let array_final: any = [];
    const tipoGasto = await this.tipoGastoRepository.findOne({where : {id:idTipoGasto}});
    if (!tipoGasto) {
        throw new NotFoundException(`Tipo Gasto con ID ${idTipoGasto} no encontrado`);
    }
    const array_temporal: any = await this.categoriaGastoRepository.query("spGetCategoriaGastosByPerson  @prmintIdPerson ="+usuario.person.id +",@prmintIdTipoGasto ="+tipoGasto.id);
    console.log(array_temporal)
    if(array_temporal.length <= 0){
      array_final = await this.categoriaGastoRepository.find({
        where : {tipoGasto : {id  : tipoGasto.id}},
        take: 5, // Obtener solo los primeros 5 registros
      });
    }else{
      array_final = array_temporal
    }
    return array_final;
  }

  async create(categoriaGastoData: Partial<CategoriaGasto>): Promise<any> {
    const newCategoriaGasto: CategoriaGasto = await this.categoriaGastoRepository.create(categoriaGastoData);
    const savedCategoriaGasto: CategoriaGasto = await this.categoriaGastoRepository.save(newCategoriaGasto);
    return {
      ok: true,
      message : `Creado con éxito`,
      categoriaGasto: savedCategoriaGasto
    };
  }

  async update(id: number, categoriaGastoData: Partial<CategoriaGasto>): Promise<any> {
    await this.categoriaGastoRepository.update(id, categoriaGastoData);
    const updatedCategoriaGasto: CategoriaGasto | undefined = await this.categoriaGastoRepository.findOne({where: {id}});
    return {
      ok: true,
      message : `Actualizado con éxito`,
      categoriaGasto: updatedCategoriaGasto
    };
  }

  async delete(id: number): Promise<any> {
    const deleteResult = await this.categoriaGastoRepository.delete(id);
    if(deleteResult.affected !== 0){
      return {
        ok: true,
        message : `El id: ${id} fue eliminado con éxito`
      }
    }else{
      return {
        ok: false,
        message : `No hubo coicidencias`
      }
    }
  }

  async getListar() {
    const categoriaGastos: CategoriaGasto[] = await this.categoriaGastoRepository.find(
      {select: { id: true, nombre:true}}
    );
    return categoriaGastos;
  }
}
