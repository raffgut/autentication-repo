import { Inject, Injectable, forwardRef} from '@nestjs/common';
import {Repository} from 'typeorm'
import{InjectRepository} from '@nestjs/typeorm'
import {genSalt, hash} from 'bcrypt'

import { CreateUserDTO } from './dto/user.dto';
import { User } from './entities/user.entity'; 
import { GetUserDTO } from './dto/getUser.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(forwardRef(()=>AuthService)) private authService:AuthService
        ){}

    async createUser(createUserDTO: CreateUserDTO) : Promise<User> {
        const user =  this.userRepository.create(createUserDTO);
        const hashPassword = await this.hashString(createUserDTO.password);
        user.password = hashPassword;
        return await this.userRepository.save(user)
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOneBy({id})
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email})
    }

    async getUserByIdentification(identification: number): Promise<User> {
        return await this.userRepository.findOneBy({identification})
    }

    async getUserByCelphone(celphone: number): Promise<User> {
        return await this.userRepository.findOneBy({celphone})
    }
    

    async hashString(data: string): Promise<string> {
        const salt = await genSalt(10);
        const hashString = await hash(data, salt);
        return hashString
    }

    async login(user: GetUserDTO){
        return this.authService.login(user);
    }

}
