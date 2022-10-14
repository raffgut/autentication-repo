import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { GetUserDTO } from "src/user/dto/getUser.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor( private authService: AuthService) {
        super({usernameField: 'username'});
    }   

    async validate(username: number, password: string):Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            return {result: false, message: 'Usuario o contraseña incorrectos', user: null};
        }
        const {id, name, role, email} = user
        const data: GetUserDTO = {id, name, role, email}
        return {result: true, data};
    }
}