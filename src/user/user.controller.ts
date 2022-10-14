import { Controller, Post, Body, Res, HttpStatus, UseGuards, Req, Get} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { keys } from 'src/config/constants';
import { GetUserDTO } from './dto/getUser.dto';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { response, Response } from 'express';

@Controller('user')
export class UserController {

    constructor( private readonly userService: UserService){}

    @Post('/register')
    async createUser(@Body() body, @Res() res ) {
        let user: User = await this.userService.getUserByIdentification(body.identification);
        if(user) return res.status(HttpStatus.FORBIDDEN).json({result: false, message:'Ya existe un usuario con la identificación suministrada'})
        user = await this.userService.getUserByEmail(body.email);
        if(user) return res.status(HttpStatus.FORBIDDEN).json({result: false, message:'Ya existe un usuario con el email suministrado'})
        const createUserDTO: CreateUserDTO = body;
        user = await this.userService.createUser(createUserDTO);
        const resultUser: GetUserDTO = {id: user.id, name:user.name, role:user.role, email: user.email}
        return res.status(HttpStatus.OK).json({result:true, message: 'Usuario creado correctamente.', user: resultUser});
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginUser(@Req() req, @Res() res : Response) {
        if (req.user.result) {
            const resp = await this.userService.login(req.user.data);
            const response = {result: resp.result, user: resp.user,access_token: resp.access_token }
            return res.cookie('rt', resp.refresh_token, { httpOnly: true, domain: keys.DOMAIN_FRONTEND}).status(HttpStatus.OK).json(response);
        }
        return res.status(HttpStatus.UNAUTHORIZED).json(req.user)
    }

}
