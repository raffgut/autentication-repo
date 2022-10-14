import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { keys } from "../config/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: keys.JWT_SECRETKEY
        })
    }

    async validate(payload: any){
        return {
            id: payload.id,
            email: payload.email,
            commerce: payload.commerce,
            role: payload.role
        }
    }
}