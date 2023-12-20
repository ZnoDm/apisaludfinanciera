import { plainToInstance } from "class-transformer";
import { UserDto } from "../dto/users.dto";
import { User } from "../entities/user.entity";


export class UserMapper {

  entityToDTO(user: User): UserDto{

    const userDTO = new UserDto({
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      nombres: user.person.nombres,
      apellidos: user.person.apellidos,
      tipoDocumentoIdentidad: user.person.tipoDocumentoIdentidad,
      documentoIdentidad: user.person.documentoIdentidad,
    });

    return userDTO;
  }
  /* 
  dtoToEntity(userDTO: CourseDTO): Course {
    const user = new Course();
    user.slug = userDTO.slug;
    return user;
  }
  */
} 
