import { IsString, IsNumber } from "class-validator";

export class CreateUserDTO {
    @IsString()
    readonly name: string;
    
    @IsString()
    readonly lastname: string;
    
    @IsString()
    readonly email: string;
    
    @IsNumber()
    readonly celphone: number;
    
    @IsNumber()
    readonly identification: number;
    
    @IsString()
    readonly password: string;
    
    @IsString()
    readonly status: string;
    
    @IsString()
    readonly role: string;

}