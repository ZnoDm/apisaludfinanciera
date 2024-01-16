import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UpdatePersonPasswordDto } from './dto/update-person-password.dto';
import * as bcrypt from "bcrypt-nodejs";
import { UpdatePersonAvatarDto } from './dto/update-person-avatar.dto';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ){}


  async getDatosPersonales(user : User) {
    if (!user.person) {
      throw new NotFoundException(`Person with idUsuario ${user.id} not found.`);
    }
    return {
      ok: true,
      person: user.person
    };
  }

  async updateDatosPersonales(user:User, updatePersonDto: UpdatePersonDto) {
    /* const person = await this.findOne(user); */
    user.person.nombres                 = updatePersonDto.nombres;
    user.person.apellidos               = updatePersonDto.apellidos;
    user.person.telefono                = updatePersonDto.telefono;
    user.person.tipoDocumentoIdentidad  = updatePersonDto.tipoDocumentoIdentidad;
    user.person.documentoIdentidad      = updatePersonDto.documentoIdentidad;

    const personUpdated = await this.personRepository.save(user.person);

    return {
      ok: true,
      message:  "Datos actualizados con éxito.",
      user: user
    }
  }

  async updatePassword(user: User, updatePersonPasswordDto: UpdatePersonPasswordDto) {

    const { oldPassword, newPassword, confirmPassword } = updatePersonPasswordDto;
    const { email,id } = user;

    const userPerson = await this.userRepository.findOne({ 
      where: { email,id },
      select: { email: true, password: true, id: true}
    });

    if ( !bcrypt.compareSync( oldPassword,userPerson.password) )
      throw new BadRequestException('Contraseña incorrecta.');

    if(newPassword.localeCompare(confirmPassword) != 0 )
      throw new BadRequestException('La nueva contraseña no coincide.');

    userPerson.password = bcrypt.hashSync(newPassword);

    await this.userRepository.save( userPerson )

    return{
      ok:true,
      message:  "Contraseña actualizada con éxito."
    }
  }

  async updateAvatar(user:User,updatePersonAvatarDto: UpdatePersonAvatarDto) {

    user.person.urlAvatar = updatePersonAvatarDto.urlAvatar;

    const personUpdated = await this.personRepository.save(user.person);
    return {
      ok: true,
      message:  "Avatar actualizados con éxito.",
      user: user
    }
  }


  async getListar() {
    const persons: Person[] = await this.personRepository.find(
      {select: { id: true, nombres: true, apellidos: true}}
    );
    return persons;
  }

  
/*   create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  */

/*   remove(id: number) {
    return `This action removes a #${id} person`;
  } */
}
