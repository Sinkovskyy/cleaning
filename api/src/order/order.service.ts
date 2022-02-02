import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private readonly userService: UserService) {

    }


    async create(jwt_token: string, data: any): Promise<any> {


        const login = (await this.userService.getUserLogin(jwt_token)) as string;

        // Get user wallet
        const wallet = (await this.userService.getWallet(login)) as number;
        const date = new Date();

        if (wallet < data.price)
            throw new HttpException('Price error', HttpStatus.BAD_REQUEST);

        // Set current sum in the wallet for the user
        const setUserWalletReponse = await this.userService.setWalletState(login, wallet - data.price);


        // Get user name
        const userName = await this.userService.getUserName(jwt_token);

        if (!setUserWalletReponse)
            return setUserWalletReponse;


        // Create new order
        const newOrder = new this.orderModel({ login, userName, date, ...data });
        return newOrder.save();
    }



    async update(where: any, data: any): Promise<any> {

        return this.orderModel.updateOne(where, data);

    }


    async findOrder(id: string): Promise<Order> {
        return this.orderModel.findOne({ _id: new Types.ObjectId(id) });
    }


    async getAll(): Promise<Order[]> {
        return this.orderModel.find({}, { __v: 0 }).exec();
    }


    async getAllOrdersBySingleUser(where): Promise<Order[]> {

        return this.orderModel.find(where, { __v: 0 }).exec();
    }




    async compeleteOrder(_id: string): Promise<Order> {
        return this.update({ _id: new Types.ObjectId(_id) }, { status: OrderStatus.completed });
    }



    async getUserLoginByOrderId(_id: string): Promise<string> {
        return (await this.orderModel.findOne({ _id: new Types.ObjectId(_id) }, { login: 1 })).login;
    }

}
