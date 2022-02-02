import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Types } from 'mongoose';
import { Order, OrderStatus } from './schemas/order.schema';



@Controller('api/order')
export class OrderController {


    constructor(
        private readonly orderService: OrderService,
        private readonly userService: UserService
    ) {

    }



    @Post('create')
    async create(
        @Body() data,
        @Req() request: Request,
        @Res() response: Response
    ) {

        const jwt_token = request.cookies['jwt'];
        const order = await this.orderService.create(jwt_token, data);

        if (!order) {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }

        response.status(HttpStatus.CREATED).send();
    }



    @Post('update')
    async update(@Body() data
    ) {



        if (data.status == OrderStatus.return) {


            const login = await this.orderService.getUserLoginByOrderId(data._id);
            const wallet = (await this.userService.getWallet(login)) as number;
            const setValueResponse = await this.userService.setWalletState(login, wallet + data.price);


            if (!setValueResponse) {
                throw new HttpException("Wallet error", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }





        return this.orderService.update({ _id: new Types.ObjectId(data._id) }, data);
    }



    @Get('getAll')
    async getAll() {

        return this.orderService.getAll();
    }


    @Get('getAllBySingleUser')
    async getAllBySingleUser(
        @Req() request: Request,
    ) {


        const jwt_token = request.cookies['jwt'];

        const login = await this.userService.getUserLogin(jwt_token);

        if (!login) {
            throw new HttpException("Server error", HttpStatus.UNAUTHORIZED);

        }

        return this.orderService.getAllOrdersBySingleUser({ login });

    }



    @Post('complete')
    async complete(@Body("_id") _id: string) {

        return this.orderService.compeleteOrder(_id);
    }

}
