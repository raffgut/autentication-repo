import { IsNumber, IsString } from "class-validator";

export class GetUserDTO {
    
    @IsString()
    readonly id: string;
    
    @IsString()
    readonly name: string;
        
    @IsString()
    readonly role: string;

    @IsString()
    readonly email: string;
    
}