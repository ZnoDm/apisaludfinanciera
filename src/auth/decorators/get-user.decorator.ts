import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';



export const GetUser = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.user as User;
        
        console.log('decorador get user',user)

        if ( !user )
            throw new InternalServerErrorException('User not found (request)');
        
        return ( !data ) 
            ? user 
            : user[data];
        
    }
);