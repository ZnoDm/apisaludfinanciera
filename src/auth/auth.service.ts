import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, getManager } from 'typeorm';

import * as bcrypt from 'bcrypt-nodejs';

import { User } from '../users/entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Person } from '../person/entities/person.entity';
import { Role } from '../rol/entities/rol.entity';
import { ValidRoles } from './enums/valid-roles';
import { UserDto } from './dto/user.dto';
import { Permiso } from 'src/permiso/entities/permiso.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Role)
    private readonly rolRepository: Repository<Role>,

    private readonly jwtService: JwtService,
  ) {}


  async create( createUserDto: CreateUserDto) {
    
    try {
      const RolUser = await this.rolRepository.findOne({ where: { nombre : "user"}});
      if (!RolUser) {
        throw new BadRequestException('No se encontró el rol user para asignar');
      }

      const { email, password, ...personData } = createUserDto;

      // * Verificar si ya existe un usuario con el mismo correo electrónico
      const existingUser = await this.userRepository.findOne({ where: { email }});
      if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está en uso');
      }

      const person = this.personRepository.create({
        ...personData
      });
      const savedPerson = await this.personRepository.save( person )
      
      const user = this.userRepository.create({
        email,
        password: bcrypt.hashSync(password),
        person: savedPerson,
        roles: [ RolUser ]
      });

      await this.userRepository.save( user )

      //*Limpiar data para mostrar
      delete user.password;
      delete user.roles;

      const jwtPayload: JwtPayload = {  id: user.id, email: user.email}

      return {
        ok: true,
        user,
        token: this.getJwtToken(jwtPayload)
      };

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, isActive:true }, //! OJO!
      relations : ['person']
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
    if ( !bcrypt.compareSync( password ,user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    //*Limpiar data para mostrar
    delete user.password;

    const jwtPayload: JwtPayload = {  id: user.id, email: user.email}

    console.log('login service',user)

    return {
      ok: true,
      user,
      token: this.getJwtToken( jwtPayload )
    };
  }

  async checkAuthStatus( user: User ){
    console.log('check-status service',user)

    //*Limpiar data para mostrar
    delete user.roles;
    const jwtPayload: JwtPayload = {  id: user.id, email: user.email}
    return {
      ok:true,
      user,
      token: this.getJwtToken(jwtPayload)
    };

  }

  async getPermisosByUser(user: User): Promise<Permiso[]> {
    const usuario = await this.userRepository.findOne({ where : { id: user.id }, relations: ['roles'] });

    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${user.id} not found`);
    }
    console.log(usuario);

    if (!usuario.roles || usuario.roles.length === 0) {
      throw new NotFoundException(`Usuario with ID ${user.id} has no roles assigned`);
    }


    const permisosAsignados: Permiso[] = [];

    usuario.roles.forEach((rol) => {
      if (rol.permisos && rol.permisos.length > 0) {
        rol.permisos.forEach((permiso) => {
          permisosAsignados.push(permiso);
        });
      }
    });
    
    return permisosAsignados;
  }



  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  //PERSONAL VALIDATOR
  private handleDBErrors( error: any ): never {
    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );
    console.log(error)
    throw new InternalServerErrorException(error.message || 'Ocurrió un error interno en el servidor');

  }



}
