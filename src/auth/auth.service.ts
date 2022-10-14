import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetUserDTO } from 'src/user/dto/getUser.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import {compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { keys } from 'src/config/constants';


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=>UserService)) private readonly userService: UserService,
        private readonly jwtService:JwtService
        ){}

    async validateUser(username: number, password: string): Promise<User> {
        try {
            const typeUsername = this.validUsername(username);
            let user: User;
            if(typeUsername === 'celphone') user = await this.userService.getUserByCelphone(username);
            if(typeUsername === 'identification') user = await this.userService.getUserByIdentification(username);
            if(!user) return null
            const validPassword = await compare(password, user.password);
            if(validPassword) return user;
            return null
            
        } catch (error) {
            return null
        }
        
    }

    validUsername(username: number): string {
        return username.toString().length === 10 && username > 2000000000 ? 'celphone': 'identification';
    }

    async login(user: GetUserDTO): Promise<any> {
        const {name,role, email, id} = user
        const returnUser: GetUserDTO = { name,role,email, id}
        const payload= {id, role};
        const tokens = await this.getTokens(payload);
        
        return {
            result: true,
            user: returnUser,
            access_token: tokens.access_token,
            refresh_token:tokens.refresh_token
        }
    }

    async getTokens(payload: any): Promise<any>{
    
        const access_token = await this.generateToken(payload, '20m');
        const decodeAccessToken = this.jwtService.decode(access_token);
        const payloadRefresh = {id: payload.id, role: payload.role, expToken: decodeAccessToken['exp']}
        const refresh_token = await this.generateToken(payloadRefresh, '5400s');
        return {access_token, refresh_token}
    }

    async generateToken(payload: any, exp: string): Promise<string> {
        return await this.jwtService.signAsync(payload,  {secret: keys.JWT_SECRETKEY, expiresIn: exp})
    }
}
