import { Body, Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserRights } from './schemas/user.schema';
import { NumberSchemaDefinition } from 'mongoose';



@Controller('api/user')
export class UserController {


    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService

    ) {

    }


    @Post('create')
    async create(
        @Body('login') login: string,
        @Body('name') name: string,
        @Body('password') password: string,
        @Body('wallet') wallet: NumberSchemaDefinition,
        @Res({ passthrough: true }) response: Response) {

        const hashedPassword = await bcrypt.hash(password, 12);


        const user = await this.userService.create({
            login,
            name,
            password: hashedPassword,
            type: UserRights.common,
            wallet: wallet
        });

        if (!user) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.status(HttpStatus.CREATED).send();
    }


    // @Post('createAdmin')
    async createAdmin(
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response) {

        const hashedPassword = await bcrypt.hash(password, 12);


        const user = await this.userService.create({
            login: "admin",
            password: hashedPassword,
            type: UserRights.admin
        });

        if (!user) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.status(HttpStatus.CREATED).send();

    }




    @Post('login')
    async login(
        @Body('login') login: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {

        const user = await this.userService.findUser({ login: login });

        if (!user) {
            throw new HttpException('User not founded', HttpStatus.NOT_FOUND);
        }


        if (! await bcrypt.compare(password, user.password)) {
            throw new HttpException('User not founded', HttpStatus.NOT_FOUND);

        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { httpOnly: true });

        const result = {};
        const specificFields = ['login', 'type', 'name'];


        specificFields.forEach(field => {
            user[field] && (result[field] = user[field]);
        })


        return result;
    }


    @Get('wallet')
    async getWallet(
        @Req() request: Request
    ) {

        const jwt_token = request.cookies['jwt'];

        const login = await this.userService.getUserLogin(jwt_token);

        return this.userService.getWallet(login);
    }


    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {

        response.clearCookie('jwt');

        response.status(HttpStatus.ACCEPTED).send();
    }


}
