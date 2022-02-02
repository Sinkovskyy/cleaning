import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';



@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService) {

    }


    async create(data: any): Promise<User> {
        const newUser = new this.userModel(data);
        return newUser.save();
    }


    async findUser(data: any) {
        return this.userModel.findOne(data);
    }


    async getWallet(login: string) {


        // Get user data
        const user = await this.findUser({ login });


        if (!user)
            throw new HttpException('User not founded', HttpStatus.UNAUTHORIZED);


        return user.wallet;


    }



    async setWalletState(login: string, wallet: number) {


        // Set wallet data
        return this.userModel.updateOne({ login }, { wallet });

    }


    async getUserLogin(jwt_token: any) {
        // Try to auth user
        try {

            const data = await this.jwtService.verifyAsync(jwt_token);

            if (!data) {
                throw new HttpException('User not founded', HttpStatus.UNAUTHORIZED);
            }

            // Return user login
            return (await this.findUser({ '_id': new Types.ObjectId(data['id']) })).login;

        }
        catch (e) {
            throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getUserName(jwt_token: any) {
        // Try to auth user
        try {

            const data = await this.jwtService.verifyAsync(jwt_token);

            if (!data) {
                throw new HttpException('User not founded', HttpStatus.UNAUTHORIZED);
            }

            // Return user name
            return (await this.findUser({ '_id': new Types.ObjectId(data['id']) })).name;

        }
        catch (e) {
            throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getUserId(jwt_token: any) {
        const data = await this.jwtService.verifyAsync(jwt_token);

        return data['id'];
    }


}
