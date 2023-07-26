import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { SingUpDto } from './dto/singUp.dto';
import { LoginDto } from './dto/login.dto';
import {UnauthorizedException} from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel : Model<User> , private jwtservice : JwtService){}

    //sign up 
    async signUp (singUpDto:SingUpDto) : Promise<{token : string}>{
        const {name, email, password} = singUpDto 
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await this.userModel.create({
            name,email,password:hashedPassword
        });
        const token  = this.jwtservice.sign({is:user._id});
        return { token }
    }

    //sign in
    async signin(singnindto:LoginDto ): Promise<{token:String}>{
        const {email,password}=singnindto;
        const user = await this.userModel.findOne({email})
        if(!user){
            throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid email or password');
        }
        const token  = this.jwtservice.sign({is:user._id});
        return { token }
    }
}
