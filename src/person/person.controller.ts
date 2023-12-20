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


  @Get('')
  @Auth()
  findOne( @GetUser() user: User) {
    return this.personService.findOne(user);
  }
   
  @Patch('update')
  @Auth()
  updateDatosPersonales(
    @GetUser() user: User,
    @Body() updatePersonDto: UpdatePersonDto
  ) {
    return this.personService.update(user,updatePersonDto);
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


  


/*   @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
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
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  } */
}
