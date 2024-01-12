import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { UpdatePersonPasswordDto } from './dto/update-person-password.dto';
import { UpdatePersonAvatarDto } from './dto/update-person-avatar.dto';
import { User } from 'src/users/entities/user.entity';


@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService
  ) {}

  //BEGIN - INFORMACION SENSIBLE DE LA PERSONA QUE REQUIERE AUTORIZACION DE USUARIO
  @Get('')
  @Auth()
  getDatosPersonales( @GetUser() user: User) {
    return this.personService.getDatosPersonales(user);
  }
 
   
  @Patch('update')
  @Auth()
  updateDatosPersonales(
    @GetUser() user: User,
    @Body() updatePersonDto: UpdatePersonDto
  ) {
    return this.personService.updateDatosPersonales(user,updatePersonDto);
  }

 
  @Patch('update/avatar')
  @Auth()
  updateAvatarPersona(
    @GetUser() user: User,
    @Body() updatePersonAvatarDto: UpdatePersonAvatarDto
  ) {
    return this.personService.updateAvatar(user,updatePersonAvatarDto);
  }


  @Post('update/password')
  @Auth()
  updatePassword(
    @GetUser() user: User,
    @Body() updatePersonPasswordDto: UpdatePersonPasswordDto
  ) {
    return this.personService.updatePassword(user,updatePersonPasswordDto);
  } 


  //END- INFORMACION SENSIBLE DE LA PERSONA QUE REQUIERE AUTORIZACION DE USUARIO

  //BEGIN - CRUDS

  @Get('listar')
  @Auth()
  getListar() {
    return this.personService.getListar();
  }

/*   


  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.personService.delete(+id);
  } */
}
