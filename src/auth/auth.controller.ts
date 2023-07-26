import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singUp.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice : AuthService){}

    @Post('/signup')
    signup(@Body() singUpDto: SingUpDto):Promise<{token : String }>{
        return this.authservice.signUp(singUpDto);
    }


    @Get('/login')
    login(@Body() singInDto: LoginDto):Promise<{token : String }>{
        return this.authservice.signin(singInDto);
    }
}
